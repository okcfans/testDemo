import { Directive, HostListener, Input } from '@angular/core';
import { ModalController, } from 'ionic-angular';
import { ImageViewModal } from '../../components/image-view/image-view-modal';
import { LoadingService } from '../../service/loading.service';
import { GalleryModal } from 'ionic-gallery-modal';
import { ImgUrl } from '../../constant/constant';

/**
 * 自定义指令 - 图片预览
 * 作者：龚媚媚
 *
 * 作用：
 * 在图片上使用image-view指令，点击就可以实现图片列表左右滑动预览。
 *
 * 使用示例：
 * <div image-view [imgList]="'showImgList'">图片预览</div>
 */
@Directive({
  selector: '[image-view]' // Attribute selector
})
export class ImageView {
  // 接收图片列表
  @Input() imgList: any[] = [];
  // 接收图片url字段名
  @Input() imgUrl: string = 'src';
  // 图片路径是否为base64, 默认为false
  @Input() isBase64: boolean = false;
  // 接收图片当前的序号，用在预览中
  @Input() imgIndex: number = 0;

  @Input('image-view') show: boolean;

  imgBase64Url = ImgUrl.Base64;

  constructor(
    private modalCtrl: ModalController,
    private loading: LoadingService
  ) {
  }

  // 点击触发动作
  @HostListener('click') onClick() {
    if (String(this.show) === '') {
      this.show = true;
    }
    if (!this.show) {
      return;
    }
    // console.log(this.imgList);
    if (JSON.stringify(this.imgList) === "[]") {
      this.loading.showToastCenter('图片列表为空');
    } else {
      this.showImgList();
    }
  }

  // 图片展示
  showImgList() {
    let photos = [];
    for (let i of this.imgList) {
      let photoUrl = i[this.imgUrl];
      if ((photoUrl.substring(0, 22) !== this.imgBase64Url) && this.isBase64) {
        photoUrl = this.imgBase64Url + photoUrl;
      }
      photos.push({url: photoUrl});
    }
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: photos,
      initialSlide: this.imgIndex
    });
    modal.present();
    // const imageViewModal = this.modalCtrl.create(ImageViewModal, {
    //   imgList:this.imgList,
    //   imgUrl:this.imgUrl,
    //   isBase64:this.isBase64,
    //   imgIndex:this.imgIndex
    // });
    // imageViewModal.present();
  }

}
