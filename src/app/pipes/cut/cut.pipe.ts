import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut',
})
export class CutPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return value.length <= 10 ? value : value.substr(0, 10) + '...';
  }
}
