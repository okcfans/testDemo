import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the EmptyStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatMoneyNull',
})
export class FormatMoneyNullPipe implements PipeTransform {
  constructor() {}

  transform(value: string) {
    let val = Number(value);
    if(val==0){
      return '';
    }
    return value;
  }
}
