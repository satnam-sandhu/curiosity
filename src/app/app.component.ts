import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tree: any;

  constructor(private http: HttpService) {}

  ngOnInit() {
    this.http.getTreeData().subscribe((res) => {
      console.log(res);
      this.tree = res;
    });
  }
}
