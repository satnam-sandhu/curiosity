import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  @Input() tree: any;
  @Input() root: any;
  @Input() openWindows: any;

  constructor(
    private http: HttpService,
    private _snackBar: MatSnackBar,
    private state: StateService
  ) {}

  ngOnInit(): void {}

  loadFile(item: any): any {
    if (item.isLoaded && !item.open) return this.openWindows.push(item);
    if (item.isLoaded && item.open) return (this.state.activeWindow = item.i);
    this.http
      .getFile(`${this.root}/${item.name}`)
      .subscribe((res: any): any => {
        if (res.status == 'error') return this._snackBar.open(res.error, 'Ok');
        item.path = `${this.root}/${item.name}`;
        item.config = res;
        item.isLoaded = true;
        this.openWindows.push(item);
        item.open = true;
        this.state.activeWindow = this.openWindows.length - 1;
      });
  }

  loadDir(item: any): any {
    if (item.isLoaded) return;
    this.http.getTreeData(`${this.root}/${item.name}`).subscribe((res) => {
      item.isLoaded = true;
      item.child = res;
    });
  }

  deleteFile(item: any) {
    this.http.getTreeData(`${this.root}/${item.name}`).subscribe((res) => {});
  }
}
