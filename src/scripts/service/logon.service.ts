import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Observable } from "rxjs/Observable";


declare let sap;
@Injectable()
export class LogonService {

  logonInfo: any;
  private context = {
    "serverHost": "mobile-f5a4daefe.cn1.hana.ondemand.com", //Place your SMP 3.0 server name here
    //"serverHost": "hcpms-i82XXXXtrial.hanatrial.ondemand.com", //SAP Cloud Platform Mobile Services
    "https": true,  //true for SAP Cloud Platform Mobile Services
    "serverPort": "443",  //443 for SAP Cloud Platform Mobile Services
    //"multiUser": true,
    //"useLocalStorage": false,
    "user": "i82XXXX",          //For demo purposes, specify the user name and password you wish to register with here to save typing on the device
    "password": "XXXXX",        //Note, if you wish to use this user name and password to be passed to the backend OData producer, choose Basic as the SSO mechanism
                                //The AuthProxy plugin with the Logon plugin can respond to 401 Authentication challenges if the same credentials used to register are also used to make OData requests
                                //Once set the credentials can be changed by calling sap.Logon.changePassword()
    "passcode": "password",     //Hardcoding passwords and unlock passcodes are strictly for ease of use during development
                                //Passcode can be changed by calling sap.Logon.managePasscode()
    "unlockPasscode": "password",
    "passcode_CONFIRM": "password",
    "oldPasscode" : "password",
    "communicatorId": "REST",

    //"auth": [ { "type": "saml2.web.post" } ], //Indicates that a redirect to a SAML IDP should be used for registration
    "auth": [
      {
        "type": "saml2.web.post",
        "config": {
          "saml2.web.post.authchallengeheader.name": "com.sap.cloud.security.login",
          "saml2.web.post.finish.endpoint.uri": "/SAMLAuthLauncher",
          "saml2.web.post.finish.endpoint.redirectparam": "finishEndpointParam"
        }
      }
    ],
    //"refreshSAMLSessionOnResume": "skip",  // Useful for offline apps when you may not wish for a saml check to be performed when the app is resumed since you may be offline

    "custom": {
      "hiddenFields": ["farmId", "resourcePath", "securityConfig", "serverPort", "https"],
      "disablePasscode": true
    }
  };

  constructor(private http: HttpClient,
              private platform: Platform,
              private local: LocalStorage,
              private loading: LoadingService,
              private pushService: PushService,
              private versioServicen: VersionService) {
  }

  //登陆初始化
  logonInit(){
    let vm = this;
    this.loading.showLoading();
    //this.clearSapSetting();
    this.logon().subscribe(data=>{
      //注册推送
      this.pushService.registerChannelId();
      this.local.set(LocalStorageKeys.USERID, data.userId);
      //获取用户信息
      vm.getUserInfo(data.userId).subscribe(data=>{
        vm.loading.hideLoading();
        vm.versioServicen.checkVersion();
        vm.getUnitMsg();
      },err=>{
        console.log(err);
        vm.loading.hideLoading();
        vm.loading.showBaseConfirm(err,function(){
          vm.logonInit();
        },function () {
          vm.versioServicen.checkVersion();
        });
      });
    },err=>{
      console.log(err);
      this.loading.hideLoading();
      this.loading.showBaseAlert('您尚未登录或登录失败，请重新登录！',function(){
        vm.logonInit();
      });
    });
  }

  //登录操作
  logon(): Observable<any>{
    let vm = this;
    return Observable.create(function(observer){
      if(vm.platform.is('cordova')){
        console.log('进入登录');
        sap.Logon.init(function(result){
          vm.logonInfo = result;
          vm.logonInfo['interfacePath'] = vm.logonInfo.applicationEndpointURL.replace(ENV.serveAppId,"");
          console.log(vm.logonInfo);
          ENV.interfacePath = vm.logonInfo['interfacePath'];
          vm.getUserId().subscribe(data=>{
            let succData = {
              result: result,
              userId: data
            }
            observer.next(succData);
          },err=>{
            observer.next(err);
          });
        }, function(error){
          console.log("An error occurred:  " , error);
          observer.error(error);
        }, ENV.serveAppId, vm.context);
      }else{
        ENV.interfacePath = 'https://mobile-f5a4daefe.cn1.hana.ondemand.com/';
        ENV.msType = ENV.interfaceEnviron +'_basic';
        observer.next({userId:ENV.basic_username});
      }
    });
  }

  //获取登录用户名
  getUserId(): Observable<any>{
    return Observable.create(function(observer){
        sap.Settings.getConfigProperty(function(value) {
          console.log('用户名：', value);
          observer.next(value);
        }, function(err){
          console.log('获取用户名失败：',err);
          observer.error(err);
        }, 'UserName');
    });
  }

  //根据用户id获取用户信息
  getUserInfo(userId): Observable<any>{
    let url = ENV.interfacePath + InterfaceAddMap[ENV.msType].standardAdd + "/EmployeeCollection?$format=json&$filter=UserID eq '"+userId+"'&$expand=EmployeeOrganisationalUnitAssignment&$select=EmployeeID,UserID,LastName,FirstName,GenderCode,GenderCodeText,EmployeeOrganisationalUnitAssignment/OrgUnitID,EmployeeOrganisationalUnitAssignment/RoleCode,EmployeeOrganisationalUnitAssignment/RoleCodeText,EmployeeOrganisationalUnitAssignment/JobID";
    let _this = this;
    return Observable.create(function(observe){
      _this.http.get(url).subscribe(data=>{
        console.log(data);
        if(data['results'].length>0){
          let user = data['results'][0];
          _this.local.set(LocalStorageKeys.EMPLOYID, user.EmployeeID);
          //只保存需要显示的部门信息
          let userOrgInfo;
          for(let employeeOrg of user.EmployeeOrganisationalUnitAssignment){
            if(employeeOrg.RoleCode == '219'){
              userOrgInfo = employeeOrg;
              break;
            }
          }
          user.EmployeeOrganisationalUnitAssignment = userOrgInfo?[userOrgInfo]:[];
          _this.local.set(LocalStorageKeys.USERINFO, user);
          observe.next(user);
        }else{
          observe.error('未查到用户信息，这将影响部分功能使用，是否重新登陆？');
        }
      },err=>{
        console.log(err);
        observe.error('获取用户信息失败，这将影响部分功能使用，您可重新登录获取，是否重新登陆？');
      });
    });
  }

  //获取组织信息
  getUnitMsg(){
    let account = this.local.get(LocalStorageKeys.USERINFO);
    if(account && account['EmployeeOrganisationalUnitAssignment'].length>0 &&
      !account['EmployeeOrganisationalUnitAssignment'][0]['OrgName']){

      let unitId = account['EmployeeOrganisationalUnitAssignment'][0].OrgUnitID;
      let url = ENV.interfacePath + InterfaceAddMap[ENV.msType].standardAdd+
        "/OrganisationalUnitNameAndAddressCollection?$format=json&$filter=OrganisationalUnitID eq '"+
        unitId+"'&$select=OrganisationalUnitID,Name";
      this.http.get(url).subscribe(data=>{
        if(data['results'].length>0) {
          account['EmployeeOrganisationalUnitAssignment'][0]['OrgName'] = data['results'][0].Name;
          this.local.set(LocalStorageKeys.USERINFO, account);
        }
      },err=>{
        console.log(err);
        //this.loading.showToastCenter(err['message']['value']);
      });
    }

  }

  //退出登录
  loginOut(){
    let _this = this;
    this.pushService.stopWork();
    sap.Logon.core.deleteRegistration(function(data){
      console.log('退出成功：',data);
      _this.clearSapSetting();
      _this.clearData();
      _this.logonInit();
    }, function(err){
      console.log('退出失败：',err);
    });
  }

  //退出登录缓存清除
  clearData(){
    this.logonInfo = null;
    this.local.remove(LocalStorageKeys.USERID);
    this.local.remove(LocalStorageKeys.EMPLOYID);
    this.local.remove(LocalStorageKeys.USERINFO);
  }

  //清除账号配置的缓存
  clearSapSetting(){
    if(this.platform.is('cordova')){
      sap.Settings.clearCache();
    }
  }
}
