import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalController} from 'ionic-angular';
import { LocationSelectModal } from '../../components/location-select/location-select-modal';

/**
 * 自定义指令 - 选择地址
 * 作者：罗瑶
 *
 * 使用方法：
 * 1. 在需要获取地址的标签中，添加get-locations-list指令。
 *
 * 使用示例：
 *  <div get-locations-list (getLocations)="getLocations($event)">选择地址</div>
 */
@Directive({
  selector: '[get-locations-list]' // Attribute selector
})
export class GeLocationsListDirective {

  constructor(
    private modalCtrl: ModalController
  ) {
  }

  @HostListener('click') onClick() {
    this.showLocationList();
  }

  @Input() needPoint: boolean = false;

  @Output() getLocations = new EventEmitter();

  showLocationList(){
    let locationSelectModal = this.modalCtrl.create(LocationSelectModal, {
      needPoint: this.needPoint
    });
    locationSelectModal.onDidDismiss(data => {
      this.getLocations.emit(data);
    });
    locationSelectModal.present();
  }
}
