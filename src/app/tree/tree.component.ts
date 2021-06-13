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

  constructor(private http: HttpService) {}

  ngOnInit(): void {}

  load(item: any): any {
    if (!item.isDir)
      return (window.location.href =
        'http://localhost:8080' + this.root + '/' + item.name);
    if (item.isLoaded) return;
    this.http.getTreeData(`${this.root}/${item.name}`).subscribe((res) => {
      item.child = res;
    });
  }
}
