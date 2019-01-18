import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { Observable } from "rxjs/Observable";
import { ENV } from '@app/env';

declare let BMap;
declare let baidu_location;
@Injectable()
export class LocationService {
  constructor(
    private http: HttpClient,
    public platform: Platform
  ) {
  }

  /**
   * 获取地址名称,先获取坐标点，再查询名称
   * */
  getLocationName(needPoint?): Observable<any>{
    let _this = this;
    return Observable.create(function(observer){
      _this.getCoordinatePoint().subscribe(point=>{
        console.log(point);
        _this.getLocationNameByPoint(point).subscribe(data=>{
          needPoint ? observer.next({data: data, point: point}) : observer.next(data);
        },err=>{
          observer.error(err);
        });
      },err=>{
        observer.error(err);
      })
    });
  }

  /**
   * 获取坐标点
   * @return observable
   * */
  getCoordinatePoint(): Observable<any>{
    let _this = this;
    let point = {
      lng: null, //经度
      lat: null  //纬度
    };
    return Observable.create(function (observer) {
      if(_this.platform.is('android')) {
        console.log('android获取经纬度');
        baidu_location.getCurrentPosition(function (p) { //android获取定位方式
          if (p.latitude != '5e-324') {
            console.log('百度定位：', p.lontitude, p.latitude);
            point.lng = p.lontitude;
            point.lat = p.latitude;
            observer.next(point);
          } else {
            observer.error('获取定位坐标失败，请确认是否开启了定位权限与定位功能');
          }
        }, function (err) {
          console.log('定位出错',err);
          observer.error('获取定位坐标失败');
        });
      } else {
        console.log('ios获取经纬度');
        navigator.geolocation.getCurrentPosition(function (p) { //ios获取定位方式
          _this.gpsPointToBD(p.coords.longitude,p.coords.latitude).subscribe(data=>{
            point.lng = data.lng;
            point.lat = data.lat;
            observer.next(point);
          }, err=>{
            observer.error(err);
          });
        },function (err) {
          console.log('定位出错',err);
          observer.error('获取定位坐标失败');
        });
      }
    });
  }

  /**
   * 根据坐标点获取地点名称
   * @param point: 地点坐标。{lng:经度, lat:纬度}
   * @return observable 返回地址信息
   * */
  getLocationNameByPoint(point): Observable<any>{
    let _this = this;
    let url = 'https://api.map.baidu.com/geocoder/v2/?location=' + point.lat + ',' + point.lng + '&coordtype=bd09ll&output=json&pois=1&ak='+ENV.baidu_api_key+'&mcode=06:83:D9:84:77:C0:66:BD:E3:F4:F5:5B:22:5E:48:4C:95:05:B3:27;com.songyu.app';
    //console.log(url);
    return Observable.create(function(observer){
      _this.http.get(url).subscribe(data=>{
        if (data['status'] === 0) {
          let province = data['result'].addressComponent.province;
          let city = data['result'].addressComponent.city;
          let district = data['result'].addressComponent.district;
          for(let item of data['result'].pois){
            item.name = province + city + district + item.name;
          }
          observer.next(data['result'].pois);
        }else{
          observer.error('地址名称查询失败');
        }
      },err=>{
        console.log('地址名称查询失败：',err);
        observer.error('地址名称查询失败');
      });
    });
  }

  /**
   * GPS坐标转百度坐标
   * @param lng:经度
   * @param lat:纬度
   * */
  gpsPointToBD(lng,lat): Observable<any>{
    return Observable.create(function (observer) {
      let ggPoint = new BMap.Point(lng, lat);
      let convertor = new BMap.Convertor();
      convertor.translate([ggPoint], 1, 5, function(data){
        console.log(data);
        if(data.status === 0) {
          observer.next(data.points[0]);
        }else{
          observer.error('地址转换失败');
        }
      })
    });
  }

  /**
   * 初始化定位，首次进入弹出询问框，避免使用地址时第一次无数据
   * */
  initLocation(){
    if(this.platform.is('cordova')){
      this.getCoordinatePoint().subscribe(data=>{
        console.log('定位初始化成功');
      },err=>{
        console.log('定位初始化失败')
      });
    }
  }
}
