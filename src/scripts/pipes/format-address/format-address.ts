import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAddress',
})
export class FormatAddressPipe implements PipeTransform {
  transform(arr: Array<any>) {
    if (arr === undefined) {
      return '请选择省市区';
    }
    switch (arr.length) {
      case 1:
        return arr[0]['ZSHENGFENText'];
      case 2:
        return arr[0]['ZSHENGFENText'] + arr[1]['ZCityName'];
      case 3:
        return arr[0]['ZSHENGFENText'] + arr[1]['ZCityName'] + arr[2]['ZCountyName'];
      default:
        return '请选择省市区';
    }
  }
}
