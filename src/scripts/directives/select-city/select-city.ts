import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SelectCityModalComponent } from '../../components/select-city-modal/select-city-modal';

/**
 * 自定义指令 - 选择省市区
 * 作者：曹智弘
 */
@Directive({
  selector: '[select-city]' // Attribute selector
})
export class SelectCityDirective {

  constructor(
    private modal: ModalController
  ) {
  }

  @HostListener('click') onClick() {
    this.showModal();
  }

  @Output() selectCity = new EventEmitter();

  showModal() {
    const modal = this.modal.create(SelectCityModalComponent);
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        this.selectCity.emit(data);
      }
    });
    modal.present();
  }

}
