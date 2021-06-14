import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor() {}

  analyze(data: any): Promise<any> {
    console.log(data.length);
    return new Promise((resolve) => {
      let meta: any = {};
      let analyze = function (i: number) {
        if (i % 100 == 0) console.log(i);
        for (let key in data[i]) {
          if (!meta[key])
            meta[key] = { types: { type: new Set(), counter: {} } };
          let type: string = typeof data[i][key];
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
