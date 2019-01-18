import { Pipe, PipeTransform } from '@angular/core';
import { CreditReportStatus } from '../../constant/constant';


@Pipe({
  name: 'formatCreditReportStatus',
})
export class FormatCreditReportStatusPipe implements PipeTransform {
  /**
   * 费用类型
   */
  transform(value: string) {
    for (let item of CreditReportStatus) {
      if (item.code === value) {
        return item.text;
      }
    }
    return '';
  }
}
