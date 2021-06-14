import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  @Input() openWindows: any = [];

  constructor() {}

  ngOnInit(): void {}
}
