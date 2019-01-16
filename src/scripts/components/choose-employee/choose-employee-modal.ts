/**
 * 选择员工
 * Created by wangzong on 2018/8/13.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {ENV} from '@app/env';
import {InterfaceAddMap} from '../../constant/interface-address-map';
import {ErrMsg} from '../../constant/constant';
import {CommonService} from '../../service/common.service';
import {LoadingService} from '../../service/loading.service';

@Component({
  selector: 'choose-dispatcher-modal',
  templateUrl: 'choose-employee-modal.html',
})
export class ChooseEmployeeModal implements OnInit{

  title: any = '选择员工';//标题
  employeeList: any = [];//员工列表
  saveEmployList: any = []; //保存员工列表
  errMsg: string = '';//错误信息
  selectedEmployee: any;//选择员工
  searchText= '';//搜索内容

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              private common: CommonService,
              private http: HttpClient,
              private loading: LoadingService) {
  }

  ngOnInit(){
    if(!this.common.isNullData(this.navParams.get('title'))){
      this.title = this.navParams.get('title');
    }
    this.init();
  }

  //初始化数据
  init(){
    this.loading.showLoading();
    let url = ENV.interfacePath + InterfaceAddMap[ENV.msType].standardAdd + "/EmployeeCollection?" +
      "$format=json&$inlinecount=allpages&$top=10000&$select=ObjectID,EmployeeID,FirstName,LastName";
    this.http.get(url).subscribe(data=>{
      this.employeeList = data['results'];
      this.saveEmployList = data['results'];
      if(this.employeeList.length == 0){
        this.errMsg = ErrMsg.NULL;
      }
      this.loading.hideLoading();
    },err=>{
      this.errMsg = ErrMsg.FAIL;
      this.loading.hideLoading();
    });
  }

  //选择
  select(employee){
    this.selectedEmployee = employee;
    this.viewCtrl.dismiss(this.selectedEmployee);
  }

  //取消
  cancel(){
    this.viewCtrl.dismiss('');
  }

  // 搜索
  searchItem() {
    this.employeeList = JSON.parse(JSON.stringify(this.saveEmployList));
    this.employeeList = this.employeeList.filter((item) => {
      let name = item.LastName + item.FirstName;
      return ((name.indexOf(this.searchText)) > -1);
    });
  }
}
