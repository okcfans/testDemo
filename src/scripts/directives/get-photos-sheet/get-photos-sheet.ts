import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';

/**
 * 自定义指令 - 选择图片
 * 作者：曹智弘
 *
 * 使用方法：
 * - 在需要拍照或者选择图片的标签中，添加get-photos-sheet指令。
 * - 指令参数可以选择ActionSheet的选项。
 * - camera指只拍照。
 * - delete指删除。
 * - album指只从相册选择。
 * - all指拍照，删除以及从相册选择。
 * - 不填时指拍照和从相册选择。
 * - 分别在(takePhoto)和(chosePhoto)指令中调用各自组件的方法。
 * - (takePhoto)指拍照。
 * - (chosePhoto)指从相册选择。
 *
 * 使用示例：
 * <div get-photos-sheet="camera" (takePhoto)="takePhoto()" (chosePhoto)="chosePhoto()">拍照或从相册选择</div>
 */
@Directive({
  selector: '[get-photos-sheet]' // Attribute selector
})
export class GetPhotosSheetDirective {

  options = {
    buttons: [
      {
        text: '拍照',
        role: '',
        handler: () => {
          this.takePhoto.emit();
        }
      },{
        text: '从相册选择',
        role: '',
        handler: () => {
          this.chosePhoto.emit();
        }
      }
    ]
  };

  constructor(
    private actionSheetCtrl: ActionSheetController
  ) {
  }

  @Input('get-photos-sheet') sheetType: string;

  @HostListener('click') onClick() {
    if (this.sheetType === 'false') {
      return;
    }
    // console.log('clicked');
    if (this.sheetType === 'camera') {
      this.options = {
        buttons: [
          {
            text: '拍照',
            role: '',
            handler: () => {
              this.takePhoto.emit();
            }
          }
        ]
      };
    } else if (this.sheetType === 'album') {
      this.options = {
        buttons: [
          {
            text: '从相册选择',
            role: '',
            handler: () => {
              this.chosePhoto.emit();
            }
          }
        ]
      };
    } else if (this.sheetType === 'delete') {
      this.options = {
        buttons: [
          {
            text: '删除',
            role: 'destructive',
            handler: () => {
              this.deletePhoto.emit();
            }
          }
        ]
      };
    } else if (this.sheetType === 'all') {
      this.options = {
        buttons: [
          {
            text: '拍照',
            role: '',
            handler: () => {
              this.takePhoto.emit();
            }
          }, {
            text: '从相册选择',
            role: '',
            handler: () => {
              this.chosePhoto.emit();
            }
          }, {
            text: '删除',
            role: 'destructive',
            handler: () => {
              this.deletePhoto.emit();
            }
          }
        ]
      };
    }
    this.showActionSheet();
  }

  @Output() takePhoto = new EventEmitter();

  @Output() chosePhoto = new EventEmitter();

  @Output() deletePhoto = new EventEmitter();

  // 拍照弹窗
  showActionSheet(){
    const actionSheet = this.actionSheetCtrl.create(this.options);
    actionSheet.present();
  }

}
