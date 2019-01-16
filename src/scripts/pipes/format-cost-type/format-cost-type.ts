import { Pipe, PipeTransform } from '@angular/core';
import { CostType } from '../../constant/constant';


@Pipe({
  name: 'formatCostType',
})
export class FormatCostTypePipe implements PipeTransform {
  /**
   * 费用类型
   */
  transform(value: string, subValue: string, isSub?: boolean) {
    let costTypeText = '';
    for (let item of CostType) {
      if (item.code === value) {
        costTypeText += item.text;
        if (subValue === undefined || subValue === '') {
          return costTypeText;
        }
        for (let subItem of item['sub']) {
          if (subItem.code === subValue) {
            costTypeText += '-' + subItem.text;
            if (isSub) {
              console.log(isSub);
              return subItem.text;
            }
            return costTypeText;
          }
        }
      }
    }
    return costTypeText;
  }
}
