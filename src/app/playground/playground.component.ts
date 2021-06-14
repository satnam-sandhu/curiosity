import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  activeWindow: any = '';
  tableFormats = ['csv', 'tsv'];
  workbookFormats = ['xlsx', 'xls'];

  @Input() openWindows: any = [];

  constructor() {}

  ngOnInit(): void {}

  makeActive(i: any) {
    this.activeWindow = i;
  }

  closeWindow(i: any) {
    this.openWindows.splice(i, 1);
    console.log(this.openWindows);
  }
}
