import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { LocalStorage } from '../service/local-storage.service';
import { LocalStorageKeys } from '../constant/constant';
import { ENV } from '@app/env';

@Injectable()
export class HttpFilter implements HttpInterceptor {
  constructor(
    private local: LocalStorage,
    private platform: Platform
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq;
    if(this.platform.is('cordova')){
      cloneReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        }
      });
    }else{
      let basicInfo = ENV.basic_username+":"+ENV.basic_password;
      let encoded = btoa(basicInfo);
      let newHeaders = {
        Authorization: 'Basic ' + encoded,
        'Content-Type': 'application/json;charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json',
        'X-SMP-APPCID': ENV.xmp_appcid,
        'x-csrf-token': 'fetch'
      };
      if(req.method == 'GET'){
        cloneReq = req.clone({
          setHeaders: newHeaders
        });
      }else{
        newHeaders['x-csrf-token'] = this.local.get(LocalStorageKeys.XCSRFTOKEN);
        cloneReq = req.clone({
          setHeaders: newHeaders
        });
      }
    }

    // 简写： const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    return next.handle(cloneReq).map((event) => {
      if (event instanceof HttpResponse) {
        //basic方式下保存
        if(!this.platform.is('cordova')) {
          if(req.method=='GET'){
            if (event.headers.get('x-csrf-token')) {
              this.local.set(LocalStorageKeys.XCSRFTOKEN, event.headers.get('x-csrf-token'));
            }
          }
        }
        switch (event.status) {
          case 200:
            if (event.body['d']) {
              if(event.body['d']['results']){
                return event.clone({body: event.body['d']});
              }else{
                return event;
              }
            } else {
              return event;
            }
          case 201:
            if (event.body['d']) {
              if(event.body['d']['results']){
                return event.clone({body: event.body['d']});
              }else{
                return event;
              }
            } else {
              return event;
            }
          case 204:
            if (event.body) {
              if (event.body['d']) {
                if(event.body['d']['results']){
                  return event.clone({body: event.body['d']});
                }else{
                  return event;
                }
              } else {
                return event;
              }
            } else {
              return event.clone({body:{results:[]}});
            }

        }
      }
    }).catch((res: HttpResponse<any>) => {
      console.log(res);
      switch (res.status) {

        /*case 400:
          if(res['error']['error'] == 'invalid_grant'){
            res['error']['message']='用户名不存在或密码错误！';
          }else{
            res['error']['message']=`【${res.status}】【${res.statusText}】`;
          }
          break;*/
        case 401:
          this.local.remove(LocalStorageKeys.TOKEN);
          if(res['error']){
            res['error']['message']={
              value:'请重新登录！'
            };
          }else{
            res['error'] = {
              message:{
                value:'请重新登录！'
              }
            };
          }
          break;
        default:
          if(res['error'] && res['error']['error']){
          }else{
            res['error'] = {
              error:{
                message:{
                  value:`【${res.status}】【${res.statusText}】`
                }
              }
            };
          }
      }
      // 以错误的形式结束本次请求
      return Observable.throw(res['error']['error']);
    });
  }
}
