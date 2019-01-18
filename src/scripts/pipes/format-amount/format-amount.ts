import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../../service/common.service';

/**
 * Generated class for the EmptyStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatAmount',
})
export class FormatAmountPipe implements PipeTransform {
  constructor(
    private common: CommonService
  ) {}
  transform(value: string) {
    return this.common.formatAmount(value);
  }
}
