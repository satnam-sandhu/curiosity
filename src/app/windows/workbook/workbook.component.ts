import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.css'],
})
export class WorkbookComponent implements OnInit {
  @Input() config: any;
  activeSheet: any = {};
  constructor() {}

  ngOnInit(): void {
    this.activeSheet = this.config.data[0];
  }

  makeActive(sheet: any) {
    this.activeSheet = sheet;
  }
}
