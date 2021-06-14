import { Component, Input, OnInit } from '@angular/core';
import { config } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() config: any = config;

  headers: any = [];

  constructor() {}

  refreshHeaders() {
    this.headers = Object.keys(this.config.data[0]);
  }

  ngOnInit() {
    this.refreshHeaders();
  }
}
