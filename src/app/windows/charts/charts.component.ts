import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core/core.service';

declare var Chart: any;

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  id: any = (Math.random() * 100).toFixed(0);
  @Input() config: any;
  @Input() openWindows: any = [];
  @Input() column: string = '';

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

  _function: string = 'count';
  type: string = 'bar';
  chart: any;
  labels: any = [];
  data: any = [];
  done: Boolean = false;
  selections: any = [];

  mergeTo: string = '';

  constructor(private core: CoreService) {}

  ngOnInit(): void {
    this.column = this.config.action.analyzeColumn;
    this.analyzeChart();
  }

  async analyzeChart() {
    this.done = false;

    if (!this.config.analyze) this.config.analyze = {};
    if (!this.config.analyze[this.column]) {
      let out = await this.core.analyze(this.config.data, {
        column: this.column,
        _function: this._function,
      });

      this.data = out.data;
      this.labels = out.labels;
    } else {
      this.data = this.config.analyze[this.column].data;
      this.labels = this.config.analyze[this.column].labels;
    }

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.id, {
      type: this.type || 'line',
      data: {
        labels: this.labels,
        datasets: [{ data: this.data }],
      },
    });
    console.log(this.chart);
    this.done = true;
  }

  goBack() {
    this.config.type = this.config._type;
  }

  merge() {
    console.log(this.selections, this.mergeTo);
  }
  async add() {
    this.pending_actions.push(Object.assign({}, this.action));
    console.log(this.pending_actions);
    // let { data } = await this.core.performActions(
    //   this.config,
    //   this.pending_actions,
    //   { sample: true }
    // );
    // this.sample_value = data[0][this.config.action.name];
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
