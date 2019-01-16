import {Component, ViewChild} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ImgUrl } from '../../constant/constant';

@Component({
  selector: 'image-view-modal',
  templateUrl: 'image-view-modal.html',
})
export class ImageViewModal{
  @ViewChild(Slides) slides: Slides;
  imgList:any[] =[];
  imgUrl:string = 'src';
  isBase64:boolean = false;
  imgIndex:number = 0;

  imgBase64Url = ImgUrl.Base64;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    // 输入参数
    this.imgList = this.navParams.get('imgList');
    this.imgUrl = this.navParams.get('imgUrl')?this.navParams.get('imgUrl'):this.imgUrl;
    this.isBase64 = this.navParams.get('isBase64')?this.navParams.get('isBase64'):this.isBase64;
    this.imgIndex = this.navParams.get('imgIndex')?this.navParams.get('imgIndex'):this.imgIndex;
  }

  ionViewDidEnter(){
    this.slides.slideTo(this.imgIndex, 100);
  }

  // 关闭弹框
  choseImage(){
    this.viewCtrl.dismiss();
  }
}
