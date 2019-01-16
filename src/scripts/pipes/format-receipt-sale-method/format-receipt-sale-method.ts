import {Pipe, PipeTransform} from '@angular/core';
import {ReceiptSaleMethod} from '../../../scripts/constant/constant';


@Pipe({
  name: 'formatReceiptSaleMethod',
})
export class FormatReceiptSaleMethod implements PipeTransform {
  transform(value: string) {
    for (let i = 0; i < ReceiptSaleMethod.length; i++) {
      if (value == ReceiptSaleMethod[i].value) {
        return ReceiptSaleMethod[i].text;
      }
    }
    return '';
  }
}
