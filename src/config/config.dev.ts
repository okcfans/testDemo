import { Config } from './config.model';

export const ENV: Config = {
  debug: true,
  pageSize: '10',
  appEnvironment: 'development',
  interfacePath: "https://mobile-f5a4daefe.cn1.hana.ondemand.com/", //接口地址
  baidu_api_key: "G8uQUSgGcxF69F6HrC1T7rYCu4fKMwj2",        //百度地图api_key
  baiduPushAndroidKey: '3IM21RIzTbKMUZaNB7wP518k',          //百度推送android key
  baiduPushIosKey: 'IiaftZrHrLQgEYrqbp7ZnWKZ',              //百度推送ios key
  ocr_idcard_url: 'http://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',
  ocr_idcard_appcode: '0bf6b85e64264b669d3ceff467916f5c',
  serveAppId:'cn.sonyu.test',                               //oauth2认证方式的服务APPid
  interfaceEnviron: 'develop',                              //接口环境  develop、prod
  msType:'develop_oauth2',
  xmp_appcid: '688ffa43-6935-4221-bdeb-485fc1c0de2b',       //basic认证方式的applicationid
  basic_username: 'TESTUSER003',                            //basic方式下的账号名
  basic_password: 'SYsap1234',                              //basic方式下的账号密码
  sap_client:'300',                                         //soap接口 sap_client
  version: {
    currentVersion: "8.1.1",
    currentVersionName: "此版本为开发版本8.1.1",
    currentSubVersion: "1",
    currentSubVersionName: "资源增量包1"
  }
};

/*
*  xmp_appcid: 'a7196d42-118c-4aa8-bd32-bfc890d94f53',       //basic认证方式的applicationid
  basic_username: 'SY001023',                            //basic方式下的账号名
* */

/**
 * xmp_appcid: '66a34ab8-e41e-47c5-bd1e-8c6221f09160',       // basic认证方式的applicationid
 * basic_username: 'TESTUSER002',                            // basic方式下的账号名
 */

/**
 * xmp_appcid: 'c306db8e-d747-4294-835c-7ee6fcdcadb4',       // basic认证方式的applicationid
 * basic_username: 'TESTUSER004',                            // basic方式下的账号名
 */
