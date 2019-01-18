import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseStatus } from '../../../scripts/constant/constant';


@Pipe({
  name: 'formatExpenseStatus',
})
export class FormatExpenseStatusPipe implements PipeTransform {
  /**
   * 根据单据状态code，转换成text 、颜色样式 、是否只读
   * @param {string} value
   * @param {boolean} isColor
   * @param {boolean} boolean
   * @returns {string}
   */
  transform(value: string,isColor?: boolean, isReadonly?:  boolean) {
    for(let i = 0; i<ExpenseStatus.length ;i++){
      if(value == ExpenseStatus[i].code){
        if(isColor){
          return ExpenseStatus[i].color;
        }else if(isReadonly){
          return ExpenseStatus[i].readonly;
        }else{
          return ExpenseStatus[i].text;
        }
      }
    }
    return '';
  }
}
