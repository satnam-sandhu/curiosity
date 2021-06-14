import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  tableFormats = ['csv', 'tsv'];
  workbookFormats = ['xlsx', 'xls'];

  @Input() openWindows: any = [];

  constructor(public state: StateService) {}

  ngOnInit(): void {}

  makeActive(i: any) {
    this.state.activeWindow = i;
  }

  closeWindow(i: any) {
    this.openWindows.splice(i, 1);
    console.log(this.openWindows);
  }
}
