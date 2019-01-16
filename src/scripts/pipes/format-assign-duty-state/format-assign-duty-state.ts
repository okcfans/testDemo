import { Pipe, PipeTransform } from '@angular/core';
import { AssignDutyStatus } from '../../constant/constant';

@Pipe({
  name: 'formatAssignDutyState',
})
export class FormatAssignDutyStatePipe implements PipeTransform {
  transform(value: string) {
    for (let item of AssignDutyStatus) {
      if (item.code === value) {
        return item.text;
      }
    }
    return '';
  }
}
