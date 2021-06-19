import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService } from '../services/http/http.service';
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

  constructor(
    public state: StateService,
    private http: HttpService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  makeActive(i: any) {
    this.state.activeWindow = i;
  }

  closeWindow(i: any) {
    this.openWindows.splice(i, 1);
  }

  setIndexAndGetName(item: any, i: number) {
    item.i = i;
    return item.name;
  }

  save(item: any) {
    console.log(item);
    this.http
      .saveFile(item.config.data, item.path, item.config._type)
      .subscribe((res) => {
        this._snackBar.open(item.path + '  saved', 'Ok');
      });
  }
}
