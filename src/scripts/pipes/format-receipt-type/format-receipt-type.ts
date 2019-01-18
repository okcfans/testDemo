import { Pipe, PipeTransform } from '@angular/core';
import { ReceiptType } from '../../../scripts/constant/constant';


@Pipe({
  name: 'formatReceiptType',
})
export class FormatReceiptTypePipe implements PipeTransform {
  transform(value: string) {
    for(let i = 0; i<ReceiptType.length ;i++){
      if(value == ReceiptType[i].value){
        return ReceiptType[i].text;
      }
    }
    /*switch (value) {
      case '1':
        return '首付款 ';
      case '2':
        return '首付借款';
      case '3':
        return '租金';
      case '4':
        return '全款';
      case '5':
        return '实际提机款';
      case '6':
        return '合计';
      case 'Z':
        return '垫款';
      default:
        return '';
    }*/
  }
}
