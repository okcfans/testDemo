import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  constructor(
    private common: CommonService
  ) {}
  transform(value: string, flag?: string) {
    return this.common.formatTime(value, flag);
  }
}
