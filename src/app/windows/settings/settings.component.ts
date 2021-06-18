import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core/core.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  @Input() config: any;
  @Input() openWindows: any = [];

  action: any = null;
  actions: any = [
    {
      type: 'substr',
      name: 'Sub String',
      param_headers: ['start', 'end'],
      params: [],
    },
  ];

  pending_actions: any = [];

  constructor(private core: CoreService) {}

  async ngOnInit() {
    console.log(this.config);
  }

  setCurrentAction(action: any) {
    console.log(action);
  }

  add() {
    this.pending_actions.push(Object.assign({}, this.action));
    console.log(this.pending_actions);
  }

  goBack() {
    this.config.type = this.config._type;
  }

  async apply() {
    let { data, headers } = await this.core.performActions(
      this.config,
      this.pending_actions
    );
    console.log(this.config);
    this.config.data = data;
    this.config.headers = headers;
    this.goBack();
  }
}
