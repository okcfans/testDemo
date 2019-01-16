import { Config } from './config.model';

export const ENV: Config = {
  debug: true,
  pageSize: '10',
  appEnvironment: 'test',
  interfacePath: "https://mobile-f5a4daefe.cn1.hana.ondemand.com/", //接口地址
  baidu_api_key: "G8uQUSgGcxF69F6HrC1T7rYCu4fKMwj2",        //百度地图api_key
  baiduPushAndroidKey: '3IM21RIzTbKMUZaNB7wP518k',          //百度推送android key
  baiduPushIosKey: 'IiaftZrHrLQgEYrqbp7ZnWKZ',              //百度推送ios key
  ocr_idcard_url: 'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',
  ocr_idcard_appcode: '0bf6b85e64264b669d3ceff467916f5c',
  serveAppId:'cn.sonyu.test',                               //oauth2认证方式的服务APPid
  interfaceEnviron: 'develop',                              //接口环境  develop、prod
  msType:'develop_oauth2',                                  //接口在地址映射中的配置类型 默认为oauth2方式
  xmp_appcid: 'f7447f6e-344a-4897-a0f6-458a840b4e87',       //basic认证方式的applicationid
  basic_username: 'TESTUSER002',                            //basic方式下的账号名
  basic_password: 'SYsap1234',                              //basic方式下的账号密码
  sap_client:'300',                                         //soap接口 sap_client
  version: {
    currentVersion: "5.2.5",
    currentVersionName: "此版本为测试版本5.2.5",
    currentSubVersion: "1",
    currentSubVersionName: "资源增量包"
  }
};
