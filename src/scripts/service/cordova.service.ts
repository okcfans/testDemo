import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

declare let navigator;
declare let Camera;

@Injectable()
export class CordovaService {

  constructor() {
  }

  /**
   * 拍照
   * */
  takePhoto(type?):Observable<any>{
    let destinationType: string = Camera.DestinationType.FILE_URI;
    if (type && type === 'dataUrl') {
      destinationType = Camera.DestinationType.DATA_URL;
    }
    let TakePhotoOption = { //拍照参数
      quality: 75,
      destinationType: destinationType,
      sourceType: Camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: false,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: false,
      correctOrientation: true
    };
    return Observable.create(function (observer) {
      let callback = {
        success:function (data){
          observer.next(data);
        },
        error:function (err){
          observer.error('拍照失败：'+err);
        }
      };
      navigator.camera.getPicture(callback.success, callback.error, TakePhotoOption);
    })
  }

  /**
   * 从相册选图(多张)
   * */
  chosePhotos(type?, maxCount?):Observable<any>{
    let _this = this;
    let outputType: string = (<any>window).imagePicker.OutputType.FILE_URI;
    /*if (type && type === 'base64') {
      outputType = (<any>window).imagePicker.OutputType.BASE64_STRING;
    }*/
    return Observable.create(function (observer) {
      (<any>window).imagePicker.getPictures(
        function(results) {
          if (type && type === 'base64'){
            let observerList = [];
            for(let rs of results){
              observerList.push(_this.imgUrlToBase64(rs));
            }
            Observable.forkJoin(observerList).subscribe(data=>{
              // console.log(data.length)
              observer.next(data);
            },err=>{
              console.log(err);
            });
          }else{
            observer.next(results);
          }
          console.log(results);

        } , function (error) {
          observer.error('图片选择失败：'+JSON.stringify(error));
        }, {
          title: '选择图片',
          locale: 'zh',
          maximumImagesCount: maxCount ? maxCount : 5,
          quality: 75,
          width: 400,
          outputType:outputType
        }
      );
    });
  }

  /**
   * 网络状态
   * true: online
   * false: offline
   */
  networkStatus(): boolean {
    let status = navigator.connection.type;
    return (status !== 'none') && (status !== undefined);
  }


  /**
   * 图片转成base64
   * @param url: 图片路径
   * */
  imgUrlToBase64(url):Promise<any>{
    let image = new Image();
    image.crossOrigin = '';
    image.src = url;
    let _this = this;
    return new Promise((resolve, reject) => {
      if(url){
        image.onload =function (){
          let dataUrl = _this.getBase64Image(image);
          resolve(dataUrl);//将base64传给done上传处理
        }
      }else{
        reject('获取base64失败');
      }
    });
  }

  getBase64Image(img,width?,height?) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
    let canvas = document.createElement("canvas");
    canvas.width = width ? width : img.width;
    canvas.height = height ? height : img.height;

    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    let dataURL = canvas.toDataURL();
    let baseStr = 'data:image/jpg;base64,';
    dataURL = dataURL.substring(baseStr.length);
    return dataURL;
  }

}
