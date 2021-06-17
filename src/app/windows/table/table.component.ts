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

  constructor(private core: CoreService) {}

  async ngOnInit() {
    this.type = this.config.type;
    this.config.headers = Object.keys(this.config.data[0]);
    this.headers.splice(this.headers.indexOf('_utc_date'), 1);
    if (this.config.meta) return (this.meta = this.config.meta);
    let { meta } = await this.core.analyze(this.config.data);
    this.config.meta = meta;
    console.log('done', meta);
    this.meta = meta;
  }

  openSettings(meta: any) {
    // this.config.type = 'settings';
    // console.log(this.config);
  }
}
