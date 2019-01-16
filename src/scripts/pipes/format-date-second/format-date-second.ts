import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Pipe({
  name: 'formatDateSecond',
})
export class FormatDateSecondPipe implements PipeTransform {
  constructor(
    private common: CommonService
  ) {}
  transform(value: string, flag?: string) {
    if (this.common.isNullData(value)) {
      return '';
    }
    return this.common.formatDateSecond(value, flag);
  }
}
