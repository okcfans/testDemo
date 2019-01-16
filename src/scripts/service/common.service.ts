import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import {ENV} from '@app/env';
import {InterfaceAddMap} from '../constant/interface-address-map';

@Injectable()
export class CommonService {
  constructor(public alertCtrl: AlertController) {}
  maxTime: string = String(new Date().getFullYear() + 50); //预购时间

  /**
   * 是否未定义
   * @param value: 需要判断是否未定义的数据
   * @return boolean
   **/
  isUndefined(value) {
    return typeof value === 'undefined';
  }

  /**
   * 字段是否为空
   * @param data:判断的对象
   * */
  isNullData(data) {
    return data === "" || data === null || typeof data === "undefined" || data == undefined ||
      (typeof data === "number" && isNaN(data));
  }

  /**
   * 某一值是否在数组中
   * @param array:数组
   * @param value:值
   * @param needIndex:是否需要返回所在数组中的下标值
   * @return 默认返回布尔值，如果传入了needIndex，则返回下标值
   * */
  isInArray(array,value,needIndex?:boolean) {
    for(let i in array){
      if(array[i]==value){
        return needIndex?i:true;
      }
    }
    return needIndex?-1:false;
  }

  /**
   * json转换成字符串
   * @param obj: 需要转换的对象
   * @return 转换后的字符串
   **/
  jsonToString(obj) {
    if (this.isUndefined(obj)) return undefined;
    return JSON.stringify(obj);
  }

  /*//Date类型格式化日期：YYYY-MM-DD
  formatDate(date?): string {
    if (date === null ||date===undefined) {
      return '';
    }
    let dateTime=parseInt(date.replace("/Date(", "").replace(")/", ""), 10);
    if (dateTime) {
      let nowDate = new Date(dateTime);
      let month: string|number = nowDate.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let today: string|number = nowDate.getDate();
      today = today < 10 ? '0' + today : today;
      return nowDate.getFullYear() + '-' + month + '-' + today;
    }
  }*/

  //获取本月第一天
  getMonthFirstDay(split?){
    let splits = split?split:'-';
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    return year + splits + month + splits+'01';//当月第一
  }

  //格式化日期：YYYY-MM-DD
  formatDate(date?, flag?): string {
    if (date === null ||date === undefined) {
      return '';
    }
    let year, month, today, hour, minute, second;
    const tz = /^\d{4}\-\d{2}\-\d{2}[T]\d{2}\:\d{2}\:\d{2}[Z]$/;
    let dateTime = parseInt(date.replace("/Date(", "").replace(")/", ""), 10);
    if (dateTime) {
      let nowDate = new Date(dateTime);
      year = nowDate.getFullYear();
      month = (nowDate.getMonth() + 1) < 10 ? '0' + (nowDate.getMonth() + 1) : (nowDate.getMonth() + 1);
      today = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
      hour = nowDate.getHours() < 10 ? '0' + nowDate.getHours() : nowDate.getHours();
      minute = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
      second = nowDate.getSeconds() < 10 ? '0' + nowDate.getSeconds() : nowDate.getSeconds();
    }
    if (tz.test(date)) {
      year = date.substring(0, 4);
      month = date.substring(5, 7);
      today = date.substring(8, 10);
      hour = date.substring(11, 13);
      minute = date.substring(14, 16);
      second = date.substring(17, 19);
    }
    switch (flag) {
      case 'YYYY':
      case 'year':
        return year;
      case 'YYYY-MM':
        return year + '-' + month;
      case 'YYYY-MM-DD':
        return year + '-' + month + '-' + today;
      case 'YYYY-MM-DD HH':
        return year + '-' + month + '-' + today + ' ' + hour;
      case 'YYYY-MM-DD HH:mm':
        return year + '-' + month + '-' + today + ' ' + hour + ':' + minute;
      case 'YYYY-MM-DD HH:mm:ss':
        return year + '-' + month + '-' + today + ' ' + hour + ':' + minute + ':' + second;
      default:
        return year + '-' + month + '-' + today;
    }
  }

  //获取当前时间：YYY-MM-DD
  getNowDate(split?:string,needTime?:boolean,timeSplit?:string) {
    let dateSplits = split ? split: '-';
    let timeSplits = timeSplit?timeSplit:':'
    let nowDate = new Date();
    let month: string|number = nowDate.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let today: string|number = nowDate.getDate();
    today = today < 10 ? '0' + today : today;
    let hour: string|number = nowDate.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute: string|number = nowDate.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second: string|number = nowDate.getSeconds();
    second = second < 10 ? '0' + second : second;
    if(needTime){
      if(timeSplits){
        return nowDate.getFullYear() +  dateSplits + month + dateSplits + today
          + ' ' + hour + timeSplits + minute + timeSplits + second;
      }else{
        return nowDate.getFullYear() +  dateSplits + month + dateSplits + today
          + dateSplits + hour + dateSplits + minute + dateSplits + second;
      }
    }
    return nowDate.getFullYear() + dateSplits + month+ dateSplits + today;
  }

  //获取当前时间：YYYYMMDDHHMMSS
  getNowDateString() {
    let nowDate = new Date();
    let month: string|number = nowDate.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let today: string|number = nowDate.getDate();
    today = today < 10 ? '0' + today : today;
    let hour: string|number = nowDate.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute: string|number = nowDate.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second: string|number = nowDate.getSeconds();
    second = second < 10 ? '0' + second : second;
    return nowDate.getFullYear() + '' + month + '' + today + '' + hour + '' + minute + '' + second;
  }

  // 格式化日期：YYYY-MM-DD HH:MM:SS
  formatTime(date, flag?): string {
    if (date === null ||date===undefined) {
      return '';
    }
    let dateTime=parseInt(date.replace("/Date(", "").replace(")/", ""), 10);
    if (dateTime) {
      let nowDate = new Date(dateTime);
      let month: string|number = nowDate.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let today: string|number = nowDate.getDate();
      today = today < 10 ? '0' + today : today;
      let hour: string|number = nowDate.getHours();
      hour = hour < 10 ? '0' + hour : hour;
      let minute: string|number = nowDate.getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      let second: string|number = nowDate.getSeconds();
      second = second < 10 ? '0' + second : second;
      return nowDate.getFullYear() + '-' + month + '-' + today + ' ' + hour + ':' + minute + ':' + second;
    }
  }

  tzToTime(date, flag){
    if (date === null ||date===undefined) {
      return '';
    }
    let dateTz=date.replace(new RegExp('-','g'),'/');
    if (date) {
      let nowDate = new Date(dateTz);
      if(flag === 'add'){
        let dateTime =  new Date(nowDate.valueOf() + 8 * 60 * 60 * 1000);
        let month: string|number = dateTime.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let today: string|number = dateTime.getDate();
        today = today < 10 ? '0' + today : today;
        let hour: string|number = dateTime.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        let minute: string|number = dateTime.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let second: string|number = dateTime.getSeconds();
        second = second < 10 ? '0' + second : second;
        return nowDate.getFullYear() + '-' + month + '-' + today + 'T' +  hour + ':' + minute + ':' + second + 'Z';
      }else{
        let dateTime =   new Date(nowDate.valueOf() - 8 * 60 * 60 * 1000);
        let month: string|number = dateTime.getMonth() + 1;
        month = month < 10 ? '0' + month : month;
        let today: string|number = dateTime.getDate();
        today = today < 10 ? '0' + today : today;
        let hour: string|number = dateTime.getHours();
        hour = hour < 10 ? '0' + hour : hour;
        let minute: string|number = dateTime.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        let second: string|number = dateTime.getSeconds();
        second = second < 10 ? '0' + second : second;
        return nowDate.getFullYear() + '-' + month + '-' + today + 'T' +  hour + ':' + minute + ':' + second + 'Z';
      }
    }
  }

  // YYYYMMDD转YYYY-MM-DD
  strToDate(str) {
    return str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
  }

  formatAmount(val){
    let str="";
    if(val){
      //str=val.substring(0,val.length - 4);
      str=Number(val).toFixed(2);
    }
    return str;
  }

  //格式金额：千分位形式xxx,xxx.00
  formatMoney(val) {
    if (this.isNullData(val)) {
      return '';
    }
    // if (Number(val) === 0) {
    //   return '';
    // }
    return (Number(val).toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  }

  // 格式化日期：毫秒
  formatDateToMillisecond(date: string): string {
    const re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!re.test(date)) {
      return;
    }
    let dateArr: Array<string> = date.split('-');
    dateArr[1] = (parseInt(dateArr[1]) >= 10 || dateArr[1][0] === '0') ? dateArr[1] : '0' + dateArr[1];
    dateArr[2] = (parseInt(dateArr[2]) >= 10 || dateArr[2][0] === '0') ? dateArr[2] : '0' + dateArr[2];
    date = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    let dateTime = new Date(date);
    return date === undefined ? undefined : '/Date(' + dateTime.valueOf() + ')/';
  }

  //格式化（YYYY-MM-DD HH:mm）日期： 毫秒
  DateToMillisecond(date: string): string{
    const re2 = /^\d{4}\-\d{1,2}\-\d{1,2}\s\d{1,2}:\d{1,2}$/;
    if(!re2.test(date)){
      return;
    }
    let dateArr: Array<string> = date.split(' ');
    let arr1: Array<string> = dateArr[0].split('-');
    arr1[1] = (parseInt(arr1[1]) >= 10 || arr1[1][0] === '0') ? arr1[1] : '0' + arr1[1];
    arr1[2] = (parseInt(arr1[2]) >= 10 || arr1[2][0] === '0') ? arr1[2] : '0' + arr1[2];
    let arr2: Array<string> = dateArr[1].split(':');
    arr2[0] = (parseInt(arr2[0]) >= 10 || arr2[0][0] === '0') ? arr2[0] : '0' + arr2[0];
    arr2[1] = (parseInt(arr2[1]) >= 10 || arr2[1][0] === '0') ? arr2[1]: '0' + arr2[1];
    date = arr1[0] + '-' + arr1[1] + '-' + arr1[2] +' '+ arr2[0] +':'+ arr2[1];
    date = date.replace(new RegExp('-','g'),'/');
    // console.log(date);
    let dateTime = new Date(date);
    return date === undefined ? undefined : '/Date(' + dateTime.valueOf() + ')/';
  }

  //格式化（YYYY-MM-DD HH:mm）日期： 毫秒
  formatDateSecond(date, flag?): string{
    if (date === null ||date === undefined) {
      return '';
    }
    let year, month, today, hour, minute, second;
    year = date.substring(0, 4);
    month = date.substring(4, 6);
    today = date.substring(6, 8);
    hour = date.substring(8, 10);
    minute = date.substring(10, 12);
    second = date.substring(12, 14);
    return year + '-' + month + '-' + today + ' ' + hour + ':' + minute + ':' + second;
  }

  // 格式化当前日期：毫秒
  formatNowDateToMillisecond(): string {
    let dateTime = new Date();
    return '/Date(' + dateTime.valueOf() + ')/';
  }

  // 格式化日期：UTC标准格式
  formatDateToTZ(date: string): string {
    const re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!re.test(date)) {
      return;
    }
    let dateArr: Array<string> = date.split('-');
    dateArr[1] = (parseInt(dateArr[1]) >= 10 || date[1][0] === '0') ? dateArr[1] : '0' + dateArr[1];
    dateArr[2] = (parseInt(dateArr[2]) >= 10 || date[2][0] === '0') ? dateArr[2] : '0' + dateArr[2];
    date = dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2];
    // console.log(date);
    let dateTime = new Date(date);
    let month: string|number = dateTime.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let today: string|number = dateTime.getDate();
    today = today < 10 ? '0' + today : today;
    let hour: string|number = dateTime.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute: string|number = dateTime.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second: string|number = dateTime.getSeconds();
    second = second < 10 ? '0' + second : second;
    return dateTime.getFullYear() + '-' + month + '-' + today + 'T' + hour + ':' + minute + ':' + second + 'Z';
  }

  //格式化（YYYY-MM-DD HH:mm）日期： UTC标准格式
  DateToTZ(date: string, flag?): string{
    const re2 = /^\d{4}\-\d{1,2}\-\d{1,2}\s\d{1,2}(:\d{1,2}){1,2}]*$/;
    if(!re2.test(date)){
      return;
    }else{
      date = date.replace(new RegExp('-','g'),'/');
    }
    let dateTime = new Date(date);
    let month: string|number = dateTime.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let today: string|number = dateTime.getDate();
    today = today < 10 ? '0' + today : today;
    let hour: string|number = dateTime.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    let minute: string|number = dateTime.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    let second: string|number = dateTime.getSeconds();
    second = second < 10 ? '0' + second : second;
    if(!flag){
      console.log(dateTime.getFullYear() + '-' + month + '-' + today + 'T' + hour + ':' + minute + ':' + second + 'Z');
      return dateTime.getFullYear() + '-' + month + '-' + today + 'T' + hour + ':' + minute + ':' + second + 'Z';
    }else{
      return dateTime.getFullYear() + '-' + month + '-' + today + 'T' + hour + ':' + minute + ':' + second;
    }

  }

  formatUUID(objectId: string): string {
    return objectId.substring(0, 8) + '-' + objectId.substring(8, 12) + '-'
      + objectId.substring(12, 16) + '-' + objectId.substring(16, 20) + '-'
      + objectId.substring(20);
  }

  /**
   * 截取路径中的html名
   * @param url: 路径
   * @return html名
   * */
  getUrlHtmlName(url){
    let re = /www\/[a-zA-Z]*\.html/;
    let wwwStr = re.exec(url)[0];
    return wwwStr.substring(4,wwwStr.length-5);
  }

  //弹框：一秒后消失
  showAlert(content) {
    const alert = this.alertCtrl.create({
      title:content?content:'出错了哟',
    });
    alert.present();
    let timer=setTimeout(()=>{
      alert.dismiss();
      clearTimeout(timer);
    },1000)
  }

  // 手机号码前缀校验
  checkPhone(phone: string) {
    if (phone === undefined || phone === '') {
      return undefined;
    }
    if (phone.substring(0, 4) === '+86 ') {
      return phone;
    }
    return '+86 ' + phone;
  }

  // 手机号码校验
  checkPhoneNumber(phone: string) {
    const re = /\d{11}$/;
    if (phone === undefined) {
      return false;
    }
    return re.test(phone.replace('+86 ', ''));
  }

  // 身份证号码校验
  checkIDNumber(number: string) {
    const re = /\d{17}(\d|X|x)$/;
    if (number === undefined || number === '') {
      return true;
    }
    return re.test(number);
  }

  // 图片添加水印
  addWaterMark(imgData, option, callback) {
    let canvas = document.createElement('canvas');
    let cxt = canvas.getContext('2d');
    let img = new Image();
    img.src = 'data:image/jpeg;base64,' + imgData;
    img.onload = () => {
      if (img.height >= 1500 && img.height < 2000) {
        canvas.height = img.height / 1.5;
        canvas.width = img.width / 1.5;
      } else if (img.height >= 2000 && img.height < 3000) {
        canvas.height = img.height / 2;
        canvas.width = img.width / 2;
      } else if (img.height >= 3000 && img.height < 4000) {
        canvas.height = img.height / 3;
        canvas.width = img.width / 3;
      } else if (img.height >= 4000 && img.height < 8000) {
        canvas.height = img.height / 5;
        canvas.width = img.width / 5;
      } else if (img.height >= 8000) {
        canvas.height = img.height / 10;
        canvas.width = img.width / 10;
      } else {
        canvas.height = img.height;
        canvas.width = img.width;
      }
      /*const imgWidth = 400;
      if (img.width > imgWidth) {
        canvas.width = imgWidth;
        canvas.height = imgWidth * (img.height / img.width);
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
      }*/
      console.log(img.width, img.height, canvas.width, canvas.height);
      cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
      cxt.font = canvas.width / 25 + 'px Arial';
      cxt.textBaseline = 'middle';
      cxt.textAlign = 'left';
      let ftop = canvas.height - (canvas.height / 25);
      let fleft = canvas.width / 10;
      cxt.fillStyle = '#ffffff';
      let countPerLine = 20;
      for (let item in option) {
        if (!option.hasOwnProperty(item)) {
          continue;
        }
        const str: string = option[item];
        if (this.isNullData(str)) {
          continue;
        }
        let line;
        if (item !== 'location') {
          countPerLine = str.length;
          line = 0;
        } else {
          countPerLine = 20;
          line = Math.floor(str.length / countPerLine);
        }
        if (line > 0) {
          let substr: string;
          for (let i = line; i >=0 ; i--) {
            substr = i === line ?
              str.substring(str.length - str.length % countPerLine) :
              str.substring(i * countPerLine, (i + 1) * countPerLine);
            cxt.fillText(substr, fleft, ftop);
            ftop -= canvas.width / 20;
          }
        } else {
          cxt.fillText(str, fleft, ftop);
          ftop -= canvas.width / 20;
        }
      }
      // let str = canvas.toDataURL('image/jpg', 0.2).substring(22);
      // let equalIndex = str.indexOf('=');
      // if(str.indexOf('=')>0)
      // {
      //   str=str.substring(0, equalIndex);
      // }
      // let strLength = str.length;
      // console.log(Number(strLength-(strLength/8)*2));
      callback ? callback(canvas.toDataURL('image/jpg', 0.9)) : null;
    };
  }
  /*addWaterMark(imgData, option, callback) {
    console.log('开始添加水印：',new Date());
    let canvas = document.createElement('canvas');
    let cxt = canvas.getContext('2d');
    let img = new Image();
    img.src = 'data:image/jpeg;base64,' + imgData;
    // return callback(img.src);
    img.onload = () => {
      /!*if (img.height >= 1500 && img.height < 2000) {
        canvas.height = img.height / 1.5;
        canvas.width = img.width / 1.5;
      } else if (img.height >= 2000 && img.height < 3000) {
        canvas.height = img.height / 2;
        canvas.width = img.width / 2;
      } else if (img.height >= 3000 && img.height < 4000) {
        canvas.height = img.height / 3;
        canvas.width = img.width / 3;
      } else if (img.height >= 4000 && img.height < 8000) {
        canvas.height = img.height / 5;
        canvas.width = img.width / 5;
      } else if (img.height >= 8000) {
        canvas.height = img.height / 10;
        canvas.width = img.width / 10;
      } else {
        canvas.height = img.height;
        canvas.width = img.width;
      }*!/
      /!*if (img.height >= 1500 && img.height < 2000) {
        canvas.height = img.height / 2;
        canvas.width = img.width / 2;
      } else if (img.height >= 2000 && img.height < 3000) {
        canvas.height = img.height / 3;
        canvas.width = img.width / 3;
      } else if (img.height >= 3000 && img.height < 4000) {
        canvas.height = img.height / 4.5;
        canvas.width = img.width / 4.5;
      } else if (img.height >= 4000 && img.height < 8000) {
        canvas.height = img.height / 6;
        canvas.width = img.width / 6;
      } else if (img.height >= 8000) {
        canvas.height = img.height / 10;
        canvas.width = img.width / 10;
      } else {
        canvas.height = img.height;
        canvas.width = img.width;
      }*!/
      if(img.width>img.height){
        canvas.width = 600;
        let vatio = canvas.width/img.width;
        canvas.height = img.height*vatio;
      }else{
        canvas.height = 600;
        let vatio = canvas.height/img.height;
        canvas.width = img.width*vatio;
      }
      console.log(img.width, img.height, canvas.width, canvas.height);
      cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
      cxt.font = canvas.width / 30 + 'px Arial';
      cxt.textBaseline = 'middle';
      cxt.textAlign = 'left';
      let ftop = canvas.height - (canvas.height / 25);
      let fleft = canvas.width / 10;
      cxt.fillStyle = '#ffffff';
      let countPerLine = 20;
      for (let item in option) {
        if (!option.hasOwnProperty(item)) {
          continue;
        }
        const str: string = option[item];
        if (this.isNullData(str)) {
          continue;
        }
        let line;
        if (item !== 'location') {
          countPerLine = str.length;
          line = 0;
        } else {
          countPerLine = 20;
          line = Math.floor(str.length / countPerLine);
        }
        if (line > 0) {
          let substr: string;
          for (let i = line; i >=0 ; i--) {
            substr = i === line ?
              str.substring(str.length - str.length % countPerLine) :
              str.substring(i * countPerLine, (i + 1) * countPerLine);
            cxt.fillText(substr, fleft, ftop);
            ftop -= canvas.width / 20;
          }
        } else {
          cxt.fillText(str, fleft, ftop);
          ftop -= canvas.width / 20;
        }
      }
      console.log('添加水印成功：',new Date())
      callback ? callback(canvas.toDataURL('image/jpg')) : null;
    };
  }*/

  /**
   * 正则验证input内容，带小数点
   * @param obj
   * @returns {boolean}
   */
  isNumber(obj) {
    let pattern = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
    let flag = pattern.test(obj);
    return flag;
  }

  /*选择url    --->调用的接口
  * flag: 标识
  * top: 查询到的列表数
  * skip: 列表的第几个开始查询
  * name: 根据姓名查询
  * */
  getCommUrl(flag, top?, skip?, name?): any {
    let url = '';
    if(flag === 'approval'){
      url = ENV.interfacePath + InterfaceAddMap[ENV.msType].standardAdd +
        "/EmployeeCollection?$format=json&$select=EmployeeID,FirstName,LastName"
        +"&$top="+ (top?top:40) +"&$skip="+ (skip?skip:0)+"&$inlinecount=allpages";
      if(name){
        url += "&$filter=LastName eq '*"+ name +"*'";
      }
    }else if(flag === 'customer'){
      url = ENV.interfacePath + InterfaceAddMap[ENV.msType].standardAddOld+
        "/AccountCollection?$format=json&$select=AccountID,AccountName,Phone,ZCertificateID";
      if(name){
        url += "&$filter=AccountName eq '*"+ name +"*'";
      }
    }else if(flag === 'car'){
      url = ENV.interfacePath + InterfaceAddMap[ENV.msType].zvehicleinfo +
        "/VehicleInformationRootCollection?$format=json";
      if(name){
        url += "&$filter= vehicleNumber eq '*"+ name +"*'";
      }
    }else if(flag === 'secondBrand'){
      url = ENV.interfacePath + InterfaceAddMap[ENV.msType].prodbrand +
        "/MaterialCollection?$format=json&$select=InternalID,Description,BrandId,BranName"
        +"&$top="+ (top?top:40) +"&$skip="+ (skip?skip:0)+"&$inlinecount=allpages";
      if(name){
        url += "&$filter= Description eq '*"+ name +"*'";
      }
    }
    return url;
  }
}
