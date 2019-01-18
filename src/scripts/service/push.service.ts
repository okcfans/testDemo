import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ENV } from '@app/env';
import { HttpClient } from '@angular/common/Http';
import { CommonService } from './common.service';

declare let device;
@Injectable()
export class PushService {

  appId:string;
  channelId:string;
  pushUserID:string;

  constructor(private platform: Platform, private common: CommonService, private http: HttpClient) {}

  /**
   * 初始化推送
   * */
  initPush(){
    if(this.platform.is('cordova')){
      let apiKey;
      let pushVM = this;
      if(this.platform.is('ios')){
        apiKey = ENV.baiduPushIosKey;
      }else{
        apiKey = ENV.baiduPushAndroidKey;
      }
      let isProduct = false;
      //if(ENV.interfaceEnviron=='prod'){
      if(ENV.appEnvironment=='production' || ENV.appEnvironment=='test'){
        isProduct = true;
      }
      (<any>window).baiduPush.startWork(apiKey, isProduct, function (result) {
        pushVM.appId = result.data.appId;
        pushVM.channelId = result.data.channelId;
        pushVM.pushUserID = result.data.userId;
        console.log('startWork success');
        console.log(result);
      }, function (error) {
        console.error('startWork fail', error);
      });

      this.onMessage();
      this.onNotificationClicked();
      this.onNotificationArrived();
    }
  }

  onMessage(){
    (<any>window).baiduPush.onMessage(function (result) {
      console.log('onMessage success', result);
    }, function (error) {
      console.error('onMessage fail', error);
    });
  }

  onNotificationClicked(){
    (<any>window).baiduPush.onNotificationClicked(function (result) {
      console.log('onNotificationClicked success', result);
    }, function (error) {
      console.error('onNotificationClicked fail', error);
    });
  }

  onNotificationArrived(){
    let arrivedVM = this;
    (<any>window).baiduPush.onNotificationArrived(function (result) {
      if(arrivedVM.platform.is('ios')){
        //alert('接收到新消息：'+JSON.stringify(result));
        console.log('接收到新消息：'+JSON.stringify(result));
      }
      console.log('onNotificationArrived success', result);
    }, function (error) {
      //alert('接收新消息失败：'+JSON.stringify(error));
      console.error('onNotificationArrived fail', error);
    });
  }

  /**
   * 推送channel id注册
   * */
  registerChannelId(){
    if(this.common.isNullData(this.channelId)){
      this.initPush();
      let vm = this;
      setTimeout(function(){
        vm.registerChannelId();
      },5000);
    }else{
      let deviceModel;
      if(this.platform.is('ios')){
        deviceModel = 'ios';
      }else{
        deviceModel = 'android';
      }
      let url = ENV.interfacePath + 'mobileservices/push/v1/runtime/applications/'
        + ENV.serveAppId + '/os/baidu/devices/'+device.uuid;
      let param = {
        "deviceModel": deviceModel,
        "pushToken": this.channelId, //——这个是channelID
        "pushGroup": "group1",
        "formFactor": "Phone",
        "userLocale": "zh",
        "timeZone": "cn",
        "msisdn": "msisdn1"
      };
      console.log(param);
      this.http.post(url,param).subscribe(data=>{
        console.log('注册成功：', data);
      },err=>{
        console.log('注册失败：', err);
        console.log(err);
      });
    }
  }

  /**
   * 解除推送
   * */
  stopWork(){
    (<any>window).baiduPush.stopWork(function (result) {
      console.log('解除绑定成功');
      console.log(result);
    }, function (error) {
      console.error('解除绑定失败', error);
    });
  }

}
