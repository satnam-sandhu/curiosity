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

  meta: any = {};
  headers: any = [];

  constructor(private core: CoreService) {}

  async ngOnInit() {
    this.headers = Object.keys(this.config.data[0]);
    let { meta } = await this.core.analyze(this.config.data);
    console.log('done', meta);
    this.meta = meta;
  }
}
