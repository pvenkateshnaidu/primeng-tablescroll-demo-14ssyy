import { Component } from '@angular/core';
import { CustomerService } from './customerservice';
import { Customer } from './customer';
import { FilterUtils } from 'primeng/utils';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService],
})
export class AppComponent {
  customers: Customer[];

  frozenValue: Customer[];

  dialogVisible: boolean;

  scrollableCols: any[];

  frozenCols: any[];

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomersLarge().then((data) => {
      this.customers = data;
      console.log(data);
    });

    this.frozenCols = [{ field: 'name', header: 'Name' }];

    this.scrollableCols = [
      { field: 'id', header: 'Id' },
      { field: 'date', header: 'Date' },
      { field: 'company', header: 'Company' },
      { field: 'status', header: 'Status' },
      { field: 'activity', header: 'Activity' },
      { field: 'country.name', header: 'Name' },
      { field: 'country.code', header: 'Country Code' },
    ];
  }

  showDialog() {
    this.dialogVisible = true;
  }

  makeRowsSameHeight() {
    setTimeout(() => {
      if (
        document.getElementsByClassName('ui-table-scrollable-wrapper').length
      ) {
        let wrapper = document.getElementsByClassName(
          'ui-table-scrollable-wrapper'
        );
        for (var i = 0; i < wrapper.length; i++) {
          let w = wrapper.item(i) as HTMLElement;
          let frozen_rows: any = w.querySelectorAll('.ui-table-frozen-view tr');
          let unfrozen_rows: any = w.querySelectorAll(
            '.ui-table-unfrozen-view tr'
          );
          for (let i = 0; i < frozen_rows.length; i++) {
            if (frozen_rows[i].clientHeight > unfrozen_rows[i].clientHeight) {
              unfrozen_rows[i].style.height =
                frozen_rows[i].clientHeight + 'px';
            } else if (
              frozen_rows[i].clientHeight < unfrozen_rows[i].clientHeight
            ) {
              frozen_rows[i].style.height =
                unfrozen_rows[i].clientHeight + 'px';
            }
          }
        }
      }
    });
  }
}
