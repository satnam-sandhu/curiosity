import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor() {}

  year_threshold = 2015;

  analyzeTypes(data: any): Promise<any> {
    return new Promise((resolve) => {
      let yt = this.year_threshold;
      let meta: any = {};
      let attemps: any = {};
      let analyzeType = function (key: any, value: any): any {
        let type: string = typeof value;
        if (type !== attemps[key]) return attemptConversion(value);
        else return { type: attemps[key], value };
      };
      let isDate = function (date: any): boolean {
        if (date.getFullYear() >= yt && date.getFullYear() <= 2019) return true;
        return false;
      };
      let attemptConversion = function (value: any): any {
        let date = new Date(value);
        if (isDate(date))
          return {
            type: 'date',
            value: new Date(value),
            extra: `${
              date.getUTCMonth() + 1
            }-${date.getUTCDate()}-${date.getUTCFullYear()}`,
          };
        if (!Number.isNaN(Number(value)) && value !== '')
          return { type: 'number', value: Number(value) };
        return { type: 'string', value };
      };
      let analyze = function (i: number) {
        if (i % 100 == 0) console.log(((i / data.length) * 100).toFixed(3));

        for (let key in data[i]) {
          let { type, value, extra }: any = analyzeType(key, data[i][key]);
          if (!attemps[key]) attemps[key] == type;
          if (!meta[key])
            meta[key] = { types: { type: new Set(), counter: {}, loc: {} } };
          data[i][key] = value;
          if (type == 'date') data[i]['_utc_date'] = extra;
          meta[key].types.type.add(type);
          if (!meta[key].types.loc[type]) meta[key].types.loc[type] = [[i, i]];
          if (!meta[key].types.counter[type]) meta[key].types.counter[type] = 0;
          let li =
            meta[key].types.loc[type][meta[key].types.loc[type].length - 1][1];
          if (i - li == 1 || i == li)
            meta[key].types.loc[type][meta[key].types.loc[type].length - 1][1] =
              i;
          else meta[key].types.loc[type].push([i, i]);
          meta[key].types.counter[type] += 1;
          if (data.length - 1 == i)
            meta[key].types.type = Array.from(meta[key].types.type);
        }
        // console.log(meta);
        if (i < data.length)
          setTimeout(function () {
            analyze(++i);
          });
        else return resolve({ meta });
      };
      setTimeout(analyze.bind(this, 0));
    });
  }

  addColumn(config: any, opts?: any): Promise<any> {
    console.log(opts);
    return new Promise((resolve) => {
      let { columns } = opts;
      let arr: any = [];
      let transform = function (i: any) {
        try {
          if (i % 100 == 0)
            console.log(((i / config.data.length) * 100).toFixed(3));

          let ob: any = {};
          for (let index = 0; index < config.headers.length; index++) {
            ob[config.headers[index]] = config.data[i][config.headers[index]];
            if (index == config.action.index) {
              let value = '';
              for (let col of columns) {
                value = value + config.data[i][col];
              }
              ob[opts.name] = value;
            }
          }
          arr.push(ob);
          if (i < config.data.length - 1 && !opts.sample)
            setTimeout(function () {
              transform(++i);
            });
          else {
            if (!opts.sample)
              config.headers.splice(config.action.index, 0, config.action.name);
            return resolve({ data: arr, headers: config.headers });
          }
        } catch (err) {
          console.log(err, config, i);
        }
      };

      setTimeout(transform.bind(this, 0));
    });
  }

  performActions(config: any, actions: any, opts?: any): Promise<any> {
    if (!opts) opts = {};
    return new Promise((resolve) => {
      let arr: any = [];
      let transform = function (i: any) {
        try {
          if (i % 100 == 0)
            console.log(((i / config.data.length) * 100).toFixed(3));

          let ob: any = {};
          for (let index = 0; index < config.headers.length; index++) {
            ob[config.headers[index]] = config.data[i][config.headers[index]];
            if (index == config.action.index) {
              let value = config.data[i][config.headers[index]];
              for (let action of actions) {
                try {
                  // console.log(action.type);
                  switch (action.type) {
                    case 'substr':
                      value = value.substr(...action.params);
                      break;
                    case 'constant':
                      // console.log(i, config.data);
                      value = value + action.params.join('');
                      break;
                    case 'regex':
                      // console.log(i, config.data);
                      value = value
                        .match(new RegExp(action.params.join(''), 'g'))
                        .join('');
                      break;
                  }
                } catch (err) {
                  console.log(err, i);
                }
              }
              ob[config.headers[index]] = value;
            }
          }
          arr.push(ob);
          if (i < config.data.length - 1 && !opts.sample)
            setTimeout(function () {
              transform(++i);
            });
          else {
            if (!opts.sample)
              config.headers.splice(config.action.index, 0, config.action.name);
            return resolve({ data: arr, headers: config.headers });
          }
        } catch (err) {
          console.log(err, config, i);
        }
      };

      setTimeout(transform.bind(this, 0));
    });
  }

  analyze(data: any, meta: any): Promise<any> {
    console.log(meta);
    return new Promise((resolve) => {
      let _processed_data: any = {};
      let processed_data: any = [];
      let analyze = function (i: number) {
        let row = data[i];
        if (i % 100 == 0) {
          console.log(((i / data.length) * 100).toFixed(3));
        }

        if (!_processed_data[row[meta.column]]) {
          processed_data.push(0);
          _processed_data[row[meta.column]] = processed_data.length;
        }
        switch (meta._function) {
          case 'count':
            processed_data[_processed_data[row[meta.column]] - 1]++;
            break;
          case 'sum':
            processed_data[_processed_data[row[meta.column]] - 1] =
              processed_data[_processed_data[row[meta.column]] - 1] +
              Number(row[row[meta.column]]);
            break;
        }
        if (i < data.length - 1) setTimeout(() => analyze(++i));
        else
          return resolve({
            data: processed_data,
            labels: Object.keys(_processed_data),
          });
      };
      setTimeout(() => analyze(0));
    });
  }

  delete(config: any, opts?: any): Promise<any> {
    if (!opts) opts = {};
    return new Promise((resolve) => {
      let arr: any = [];
      let transform = function (i: any) {
        if (i >= config.data.length - 1)
          return resolve({ data: arr, headers: config.headers });

        try {
          if (i % 100 == 0) {
            console.log(((i / config.data.length) * 100).toFixed(3));
          }
          if (opts.values.includes(config.data[i][opts.column]))
            return setTimeout(function () {
              transform(++i);
            });
          let ob = Object.assign({}, config.data[i]);
          arr.push(ob);
          if (i < config.data.length - 1)
            setTimeout(function () {
              transform(++i);
            });
          else {
            return resolve({ data: arr, headers: config.headers });
          }
        } catch (err) {
          console.log(err, config, i);
        }
      };

      setTimeout(transform.bind(this, 0));
    });
  }

  convertColumn(data: any, meta: any) {
    console.log(meta);
    return new Promise((resolve) => {
      let convert = function (i: number) {
        if (i % 100 == 0) {
          console.log(i);
        }
        data[i][meta.head] = (function (type: any): any {
          switch (type) {
            case 'date':
              let _date = new Date(data[i][meta.head]);
              let date = `${_date.getUTCFullYear()}-${
                _date.getUTCMonth() + 1
              }-${_date.getUTCDate()}`;
              return date;
            case 'number':
              return Number(data[i][meta.head]);
          }
        })(meta.type);
        if (i < data.length - 1)
          setTimeout(() => {
            convert(++i);
          });
      };
      setTimeout(() => {
        convert(0);
      });
    });
  }
}
