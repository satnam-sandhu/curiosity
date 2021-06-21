import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() config: any;
  @Input() endAt: number = 10;
  @Input() openWindows: any = [];

  type: string = '';
  meta: any = {};
  headers: any = [];
  types: any = {};

  constructor(private core: CoreService) {}

  async ngOnInit() {
    this.type = this.config.type;
    this.config._type = this.config.type;
    this.config.headers = Object.keys(this.config.data[0]);
    for (let head of this.config.headers) this.types[head] = 'string';
    this.headers.push('_utc_date');
    // if (this.config.meta) return (this.meta = this.config.meta);
    let { meta } = await this.core.analyzeTypes(this.config.data);
    // let meta = {};
    // for (let head in meta) {
    //   if (meta[head].types.length > 1) {
    //     let dominant = { counter: 0, type: 0 };
    //     for (let type in meta[head].types) {
    //       if (meta[head].counter[type] > dominant.counter)
    //         dominant.counter = meta[head].counter[type];
    //         dominant.type =
    //     }
    //   }
    // }
    this.config.isAnalyzed = true;
    // let meta = {};
    this.config.meta = meta;
    console.log('done', meta);
    this.meta = meta;
    let head = ' ';
  }

  openSettings(action: any) {
    console.log(action);
    this.config.type = 'settings';
    this.config.action = action;
  }

  deleteRow(i: any) {
    this.config.data.splice(i, 1);
  }

  convert(head: string) {
    console.log(head, this.types);
    this.core.convertColumn(this.config.data, { head, type: this.types[head] });
  }
}
