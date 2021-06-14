import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {
  @Input() tree: any;
  @Input() root: any;
  @Input() openWindows: any;

  constructor(private http: HttpService) {}

  ngOnInit(): void {}

  loadFile(item: any) {
    if (item.isLoaded) return;
    this.http.getFile(`${this.root}/${item.name}`).subscribe((res) => {
      item.path = `${this.root}/${item.name}`;
      item.config = res;
      item.isLoaded = true;
      this.openWindows.push(item);
    });
  }

  loadDir(item: any): any {
    if (item.isLoaded) return;
    this.http.getTreeData(`${this.root}/${item.name}`).subscribe((res) => {
      item.isLoaded = true;
      item.child = res;
    });
  }
}
