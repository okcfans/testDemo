import { Pipe, PipeTransform } from '@angular/core';
import { ProcessingType } from '../../constant/constant';

@Pipe({
  name: 'formatProcessingType',
})
export class FormatProcessingTypePipe implements PipeTransform {
  transform(value: string) {
    for (let item of ProcessingType) {
      if (item.code === value) {
        return item.text;
      }
    }
    return '';
  }
}
