import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {LocationService} from '../../service/location.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'location-select-modal',
  templateUrl: 'location-select-modal.html',
})
export class LocationSelectModal {
  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
               private location: LocationService,
              private loading: LoadingService) {
    this.needPoint = this.navParams.get('needPoint');
  }

  selectedLocationName: string='';
  locationList = []; //地址数组
  needPoint: boolean = false;
  point: any;
  //初始化数据

  //dataList = ['湖南省长沙市岳麓区岳麓大道','湖南省长沙市高新区中电软件园','湖南省衡阳市石鼓区某某市场'];//显示数据
  choseLocation(id){
    //this.selectedLocationName = id;
    if (this.needPoint) {
      this.viewCtrl.dismiss({name: id, point: this.point});
    } else {
      this.viewCtrl.dismiss(id);
    }
  }

  ngOnInit(){
    this.getLocation();
  }

  //点击返回
  back(){
    this.viewCtrl.dismiss('');
  }

  getLocation(){
    this.loading.showLoading();
    this.location.getLocationName(this.needPoint).subscribe(data=>{
      this.locationList = this.needPoint ? data['data'] : data;
      this.point = this.needPoint ? data['point'] : undefined;
      this.loading.hideLoading();
    });
  }
}
