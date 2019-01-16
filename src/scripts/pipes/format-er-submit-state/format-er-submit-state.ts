import { Pipe, PipeTransform } from '@angular/core';
import { ERSubmitState } from '../../constant/constant';


@Pipe({
  name: 'formatERSubmitState',
})
export class FormatERSubmitStatePipe implements PipeTransform {
  /**
   * 根据费用报销状态编码获取状态或颜色
   */
  transform(value: string,isColor?: boolean) {
    for(let i = 0; i<ERSubmitState.length ;i++){
      if(value == ERSubmitState[i].code){
        if(isColor){
          return ERSubmitState[i].color;
        }else{
          return ERSubmitState[i].text;
        }
      }
    }
    return '';
  }
}
