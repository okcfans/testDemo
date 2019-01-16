import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LocationService } from '../scripts/service/location.service';
import { PushService } from '../scripts/service/push.service';
import { LogonService } from '../scripts/service/logon.service';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private logonService: LogonService,
              private pushService: PushService,
              private location: LocationService
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.location.initLocation();
      this.pushService.initPush(); //初始化推送
      this.logonService.logonInit();//登录处理
    });
  }
}
