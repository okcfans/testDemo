import { Pipe, PipeTransform } from '@angular/core';
import { EquipmentEngineering } from '../../constant/constant';

/**
 * Generated class for the EmptyStringPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'formatEngineering',
})
export class FormatEngineeringPipe implements PipeTransform {
  constructor() {
    this.EquipmentEngineering = EquipmentEngineering;
  }

  EquipmentEngineering: any;

  transform(value: string) {
    for (let item of this.EquipmentEngineering) {
      if (item.code === value) {
        return item.text;
      }
    }
    return '';
  }
}
