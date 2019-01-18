import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { PushService } from '../scripts/service/push.service';
import { LogonService } from '../scripts/service/logon.service';
import { CommonService } from '../scripts/service/common.service';
import { LocalStorage } from '../scripts/service/local-storage.service';
import { HttpFilter } from '../scripts/filter/http.filter';
import { LoadingService } from '../scripts/service/loading.service';
import { HandBridgeService } from '../scripts/service/handBridge.service';
import { CordovaService } from '../scripts/service/cordova.service';
import { LocationService } from '../scripts/service/location.service';
import { VersionService } from '../scripts/service/version.service';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPageModule } from '../pages/login/login.module';
//import { TabsPageModule } from '../pages/tabs/tabs.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',
      iconMode: 'ios',        // 安卓icon强制使用ios的icon以及样式
      mode: 'ios',            // 样式强制使用ios样式
      backButtonText:''
    }),
    ionicGalleryModal.GalleryModalModule,
    HttpClientModule,
    LoginPageModule,
    //TabsPageModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    { provide: HTTP_INTERCEPTORS, useClass: HttpFilter, multi: true },
    { provide: HAMMER_GESTURE_CONFIG, useClass: ionicGalleryModal.GalleryModalHammerConfig },
    PushService,
    LogonService,
    CommonService,
    LocalStorage,
    LoadingService,
    HandBridgeService,
    CordovaService,
    LocationService,
    VersionService
  ]
})
export class AppModule {}
