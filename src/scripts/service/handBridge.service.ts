import { Injectable } from '@angular/core';

import { LocalStorage } from './local-storage.service';
import { CommonService } from './common.service';
import { LocalStorageKeys } from '../constant/constant';
import {Observable} from "rxjs/Observable";

declare let HandBridge;

@Injectable()
export class HandBridgeService {
  constructor(private local: LocalStorage,private common: CommonService) {
  }

  /**
   * 获取登录信息
   * */
  getLoginInfo():Observable<any>{
    let _this = this;
    return Observable.create(function (observer) {
      (<any>window).ACallBack = function (message) {
        let obj = JSON.parse(message);
        _this.local.set(LocalStorageKeys.TOKEN,obj.token);
        _this.local.set(LocalStorageKeys.EMPLOYID,obj.employId);
        //获取html名称
        let htmlName=_this.common.getUrlHtmlName(window.location.href);
        console.log('tokenlogin:',_this.local.get(LocalStorageKeys.TOKEN));
        observer.next(htmlName);
      };
      (<any>window).bCallBack = function () {
        _this.local.remove(LocalStorageKeys.TOKEN);
        _this.local.remove(LocalStorageKeys.EMPLOYID);
        observer.error('E');
      };

      let dict = {
        'className':'BaseBridge',
        'function':'getBaseInfo',
        'successCallBack':'ACallBack',
        'failureCallBack':'bCallBack'
      };
      HandBridge.postMessage(JSON.stringify(dict));
    })
  }

  /**
   * 返回壳子,退出子应用
   **/
  exitChildApp(){
    console.log('退出子应用');
    let params = {
      className: 'BaseBridge',
      function: 'close',
      successCallBack: '',
      failCallBack: ''
    };
    HandBridge.postMessage(JSON.stringify(params));
  }

}
