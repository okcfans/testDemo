import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'EveryFormatStatus',
})
export class EveryFormatStatus implements PipeTransform {
  /**
   * data：定义的常量
   * 返回接口字段对应的文字描述
   */
  transform(value: string, data?: any) {
    for(let i = 0; i<data.length ;i++){
      if(value == data[i].code){
        return data[i].text;
      }
    }
    return '';
  }
}
