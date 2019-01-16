import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ENV } from '@app/env';
import { HttpClient } from '@angular/common/Http';
import { LocalStorage } from './local-storage.service';
import { LocalStorageKeys } from '../constant/constant';
import { InterfaceAddMap } from '../constant/interface-address-map';
import { CommonService } from './common.service';
import { LoadingService } from './loading.service';
import {Observable} from "rxjs/Observable";

declare let hotpatch;
@Injectable()
export class VersionService {

  localVersion: string; //本地版本
  updateType = {  //更新类型
    hot:'HOTUPDATE',
    big:'BIGUPDATE'
  }
  updateData = [null,null];

  constructor(private platform: Platform,
              private common: CommonService,
              private http: HttpClient,
              private local: LocalStorage,
              private loading: LoadingService) {
  }

  /**
   * 版本检测调用
   * */
  checkVersion(needNoUpdateShow?:boolean){
    this.getVersionInfo().subscribe(data=>{
      console.log(data);
      if(data['results'].length>0){
        for(let item of data['results']){
          if(item.UpdateType==this.updateType.hot){
            this.updateData[0] = item;
          }else{
            this.updateData[1] = item;
          }
        }
        this.isNeedUpdate(this.updateData,needNoUpdateShow);
      }else{
        if(needNoUpdateShow){
          this.loading.showBaseAlert('暂无更新的内容！');
        }
      }
    },err=>{
      if(needNoUpdateShow){
        this.loading.showBaseAlert(err['message']['value']);
      }
      console.log(err);
    });
  }


  /**
   * 初始化版本信息
   * */
  initVersionInfo() {
    /*let version = this.local.get(LocalStorageKeys.VERSION);
    if (this.common.isNullData(version)) {
      this.local.set(LocalStorageKeys.VERSION,ENV.version.currentVersion);
    }*/
    this.local.set(LocalStorageKeys.VERSION,ENV.version.currentVersion);
    this.localVersion = this.local.get(LocalStorageKeys.VERSION);
    console.log("本地版本：", this.localVersion);
  }

  /**
   * 获取版本信息
   * */
  getVersionInfo(): Observable<any>{
    this.initVersionInfo();

    let platformName = 'ANDROID';
    if(this.platform.is('ios')){
      platformName = 'IOS';
    }
    let url = ENV.interfacePath + InterfaceAddMap[ENV.msType].appupdate+
      "/ApplicationUpdateCollection?" +
      "$format=json&" +
      "$select=ID,ObjectID,VersionNumber,UpdateType,DownloadAddress,Comments,Attachment/DocumentLink&$expand=Attachment" +
      "&$filter=(Actived eq true) and (LatestedVersion eq true) and (Platform eq '"+platformName+"')";
    return this.http.get(url);
  }

  /**
   * 版本比较是否需要更新
   * */
  isNeedUpdate(updateArr,needNoUpdateShow?:boolean){
    if(!this.common.isNullData(updateArr[1])){ //先比较大版本是否要更新
      let bigType = this.compareVersion(this.localVersion, updateArr[1].VersionNumber);
      if(bigType==this.updateType.big){
        //进入大版本更新
        this.bigUpdate(updateArr[1]);
      }else{ //如果大版本不需要更新，再比较小版本
        if(!this.common.isNullData(updateArr[0])){
          let hotType = this.compareVersion(this.localVersion, updateArr[0].VersionNumber);
          if(hotType == this.updateType.hot){
            //进入小版本
            this.hotUpdate(updateArr[0]);
          }else{
            if(needNoUpdateShow){
              this.loading.showBaseAlert('您的APP已经是最新的啦~~');
            }
          }
        }else{
          if(needNoUpdateShow){
            this.loading.showBaseAlert('您的APP已经是最新的啦~~');
          }
        }
      }
    }else if(!this.common.isNullData(updateArr[0])){  //如果大版本无更新数据，则比较小版本
      let hotType = this.compareVersion(this.localVersion, updateArr[0].VersionNumber);
      if(hotType == this.updateType.hot){
        //进入小版本
        this.hotUpdate(updateArr[0]);
      }else{
        if(needNoUpdateShow){
          this.loading.showBaseAlert('您的APP已经是最新的啦~~');
        }
      }
    }else{
      if(needNoUpdateShow){
        this.loading.showBaseAlert('您的APP已经是最新的啦~~');
      }
    }
  }

  /**
   * 大版本更新
   * */
  bigUpdate(updateInfo){
    this.loading.showBigUpdateAlert(updateInfo.Comments,function(){
      window.open(updateInfo.DownloadAddress, '_system', 'location=yes');
    });
  }

  /**
   * 小版本更新
   * */
  hotUpdate(updateInfo){
    this.loading.showUpdateConfirm(updateInfo.Comments, function(){
      let url = updateInfo.Attachment[0].DocumentLink;
      let matchStr = 'appupdate';
      var index=url.lastIndexOf(matchStr);
      url=url.substring(index+matchStr.length,url.length);
      console.log(url);
      let actualUrl = ENV.interfacePath + InterfaceAddMap[ENV.msType].appupdate+url;
      console.log(actualUrl);
      hotpatch.updateNewVersion(actualUrl);
    });
  }

  /**
   * 是否需要版本更新
   * @returns big 有大版本更新、sub 小版本更新、none 无更新
   */
  compareVersion(version1, version2) {
    let versionArr1 = version1.split('.');
    let versionArr2 = version2.split('.');
    if (parseInt(versionArr1[0]) < parseInt(versionArr2[0])) {
      return this.updateType.big;
    } else if (parseInt(versionArr1[0]) == parseInt(versionArr2[0])) {
      if (parseInt(versionArr1[1]) < parseInt(versionArr2[1])) {
        return this.updateType.hot;
      } else if (parseInt(versionArr1[1]) == parseInt(versionArr2[1])) {
        if (parseInt(versionArr1[2]) < parseInt(versionArr2[2])) {
          return this.updateType.hot;
        }
      }
    }
    return false;
  }

}
