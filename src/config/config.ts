import { Config } from './config.model';

export const ENV: Config = {
  debug: true,
  pageSize: '10',
  appEnvironment: 'production',
  interfacePath: "https://mobile-f5a4daefe.cn1.hana.ondemand.com/", //接口地址
  baidu_api_key: "G8uQUSgGcxF69F6HrC1T7rYCu4fKMwj2",        //百度地图api_key
  baiduPushAndroidKey: 'xmGybxAAsndt8toNELpa46Za',          //百度推送android key
  baiduPushIosKey: 'GCQRIMChhs50UgqOpeYLQFkH',              //百度推送ios key
  ocr_idcard_url: 'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',
  ocr_idcard_appcode: '0bf6b85e64264b669d3ceff467916f5c',
  serveAppId:'cn.sonyu.prod',                               //oauth2认证方式的服务APPid
  interfaceEnviron: 'prod',                              //接口环境  develop、prod
  msType:'prod_oauth2',                                  //接口在地址映射中的配置类型 默认为oauth2方式
  xmp_appcid: 'f7447f6e-344a-4897-a0f6-458a840b4e87',       //basic认证方式的applicationid
  basic_username: 'TESTUSER002',                            //basic方式下的账号名
  basic_password: 'SYsap1234',                              //basic方式下的账号密码
  sap_client:'800',                                         //soap接口 sap_client
  version: {
    currentVersion: "1.1.0",
    currentVersionName: "此版本为正式版本1.1.0",
    currentSubVersion: "1",
    currentSubVersionName: "资源增量包"
  }
};
