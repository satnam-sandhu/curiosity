import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-workbook',
  templateUrl: './workbook.component.html',
  styleUrls: ['./workbook.component.css'],
})
export class WorkbookComponent implements OnInit {
  @Input() config: any;
  @Input() endAt: number = 10;
  @Input() openWindows: any;
  @ViewChild(TableComponent) table: TableComponent | undefined;

  tableFormats = ['csv', 'tsv'];
  workbookFormats = ['xlsx', 'xls'];

  activeSheet: any = {};
  constructor() {}

  ngOnInit(): void {
    this.activeSheet = this.config.data[0];
    this.activeSheet.open = true;
    console.log(this.config);
  }

  deleteSheet(i: any) {}

  changeActiveSheet(sheet: any) {
    sheet.open = true;
    this.activeSheet = sheet;
    this.table?.ngOnInit();
  }
}
