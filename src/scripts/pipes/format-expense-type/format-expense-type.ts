import { Pipe, PipeTransform } from '@angular/core';
import { ExpenseType } from '../../constant/constant';


@Pipe({
  name: 'formatExpenseType',
})
export class FormatExpenseTypePipe implements PipeTransform {
  /**
   * 根据报销类型编码获取报销类型
   */
  transform(value: string) {
    for(let i = 0; i<ExpenseType.length ;i++){
      if(value == ExpenseType[i].code){
        return ExpenseType[i].text;
      }
    }
    return '';
  }
}
