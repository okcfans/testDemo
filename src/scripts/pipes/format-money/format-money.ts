import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../../service/common.service';

/**
 * Generated class for the EmptyStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatMoney',
})
export class FormatMoneyPipe implements PipeTransform {
  constructor(
    private common: CommonService
  ) {}
  transform(value: string) {
    return this.common.formatMoney(value);
  }
}
