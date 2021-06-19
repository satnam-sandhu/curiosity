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

  selections: any = {};

  sample_value: any;
  action: any = {};
  actions: any = [
    {
      type: 'substr',
      name: 'Sub String',
      param_headers: ['Starting Index', 'Ending Index'],
      params: [],
    },
    {
      type: 'regex',
      name: 'RegEx',
      param_headers: ['regex'],
      params: [],
    },
    {
      type: 'constant',
      name: 'Constant Value',
      param_headers: ['Constant Value'],
      params: [],
    },
  ];

  pending_actions: any = [];

  constructor(private core: CoreService) {}

  async ngOnInit() {
    this.sample_value =
      this.config.data[0][this.config.headers[this.config.action.index]];
  }

  setCurrentAction(action: any) {
    console.log(action);
  }

  goBack() {
    this.config.type = this.config._type;
  }

  async apply() {
    let { data, headers } = await this.core.addColumn(this.config, {
      columns: Object.keys(this.selections).filter(
        (head) => this.selections[head]
      ),
      name: this.config.action.name,
    });
    console.log(this.config);
    this.config.data = data;
    this.config.headers = headers;
    this.goBack();
  }
}
