import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): string {
    try {
      let date = value.getUTCDate();
      let month = value.getUTCMonth() + 1;
      let year = value.getUTCFullYear();
      let hour = value.getUTCHours();
      let min = value.getUTCMinutes();
      return `${month}-${date}-${year} ${hour}:${min}`;
    } catch (err) {
      return value;
    }
  }
}
