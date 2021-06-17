import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor() {}

  year_threshold = 2015;

  analyze(data: any): Promise<any> {
    console.log(data.length);
    return new Promise((resolve) => {
      let yt = this.year_threshold;
      let meta: any = {};
      let attemps: any = new Set();
      let analyzeType = function (key: any, value: any): any {
        let type: string = typeof value;
        if (type !== attemps[key]) return attemptConversion(value);
        else return { type: attemps[key], value };
      };
      let isDate = function (date: any): boolean {
        if (date.getFullYear() >= yt) return true;
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
        if (i % 100 == 0) console.log(i);
        for (let key in data[i]) {
          let { type, value, extra }: any = analyzeType(key, data[i][key]);
          if (!meta[key])
            meta[key] = { types: { type: new Set(), counter: {} } };
          data[i][key] = value;
          if (type == 'date') data[i]['_utc_date'] = extra;
          meta[key].types.type.add(type);
          if (!meta[key].types.counter[type]) meta[key].types.counter[type] = 0;
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
}