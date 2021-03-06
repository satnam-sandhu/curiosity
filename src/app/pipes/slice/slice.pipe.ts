import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice',
})
export class SlicePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    try {
      return value.slice(args[0], args[1]);
    } catch {
      return value;
    }
  }
}
