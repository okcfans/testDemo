import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SelectProductModalComponent } from '../../components/select-product-modal/select-product-modal';

/**
 * 自定义指令 - 选择机型
 * 作者：曹智弘
 */
@Directive({
  selector: '[select-product]' // Attribute selector
})
export class SelectProductDirective {
  // 是否附属品
  @Input() isAccessories: boolean = false;
  // 可否更改机型和品牌
  @Input() isFixed: boolean = false;
  // 类型ID
  @Input() internalId: string;
  // 品牌ID
  @Input() brandId: string;

  constructor(
    private modal: ModalController
  ) {
  }

  @HostListener('click') onClick() {
    this.showModal();
  }

  @Output() selectProduct = new EventEmitter();

  // 打开modal
  showModal() {
    const modal = this.modal.create(SelectProductModalComponent, {
      isAccessories: this.isAccessories,
      isFixed: this.isFixed,
      internalId: this.internalId,
      brandId: this.brandId
    });
    modal.onDidDismiss(data => {
      if (data !== undefined) {
        this.selectProduct.emit(data);
      }
    });
    modal.present();
  }

}
