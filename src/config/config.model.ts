export interface Config {
  debug: boolean;
  pageSize: string;
  appEnvironment: string;
  interfacePath: string, //接口地址
  baidu_api_key?: string, //百度地图api_key
  baiduPushAndroidKey: string,  //百度推送android key
  baiduPushIosKey: string,  //百度推送ios key
  ocr_idcard_url: string,   // 身份证识别地址
  ocr_idcard_appcode: string, // 身份证识别appcode
  serveAppId: string, //oauth2认证方式的服务APPid
  interfaceEnviron: string, //接口环境  develop、prod
  msType: string,  //接口在mobileservice中的配置类型  interfaceEnviron+'_'+authType
  xmp_appcid: string, //basic认证方式的applicationid
  basic_username?: string, //basic方式下的账号名
  basic_password?: string, //basic方式下的账号密码
  sap_client: string, //soap接口 sap_client
  version: {
    currentVersion: string,
    currentVersionName: string,
    currentSubVersion: string,
    currentSubVersionName: string
  }
}
