/**
 * 选择列表   -公共
 * Created by wangzong on 2018/8/13.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {ErrMsg} from '../../../scripts/constant/constant';
import {CommonService} from '../../../scripts/service/common.service';
import {LoadingService} from '../../../scripts/service/loading.service';

@Component({
  selector: 'comm-choose-modal',
  templateUrl: 'comm-choose-modal.html',
})
export class CommChooseModal implements OnInit{

  title: any = '选择审批人';     //标题
  dataList: any = [];            //数据列表
  errMsg: string = '';           //错误信息
  selectedData: any;             //选择一条数据
  searchText= '';                //搜索内容
  flag:string = '';              //展示的内容（可修改）   approval:审批人

  constructor(public navParams: NavParams,
              public viewCtrl: ViewController,
              private common: CommonService,
              private http: HttpClient,
              private loading: LoadingService,
  ) {
  }

  ngOnInit(){
    if(!this.common.isNullData(this.navParams.get('title'))){
      this.title = this.navParams.get('title');
    }
    if(this.navParams.get('flag')){
      this.flag = this.navParams.get('flag');
    }
    this.init();
  }

  //初始化数据
  init(){
    let url = this.getUrl();
    this.getList(url);
  }

  //得到url
  getUrl(top?, skip?, name?){
    return this.common.getCommUrl(this.flag,top,skip,name);
  }

  //选中数据    回调给原界面
  select(approval){
    this.selectedData = approval;
    this.viewCtrl.dismiss(this.selectedData);
  }

  //取消
  cancel(){
    this.viewCtrl.dismiss('');
  }

  /*************搜索框查询    开始***********/
  //搜索按钮
  searchData(){
    if(!this.common.isNullData(this.searchText)){
      this.dataList=[];
      //调用搜索
      let url = this.getUrl(false, false, this.searchText);
      this.getList(url);
    }
  }

  //搜索输入监控
  searchChange(){
    if(this.common.isNullData(this.searchText)){
      //调用搜索
      let url = this.getUrl();
      this.getList(url);
    }
  }

  //搜索清除
  searchClear(){
    this.searchText ='';
    this.searchChange();
  }
  /**************搜索框查询    结束***************/

  /**************加载更多      开始*************/
  loadData(event){
    //调用搜索
    let top = 20;
    let skip = this.dataList.length;
    let url = this.getUrl(top,skip);
    this.getList(url, event);
  }
  /**************加载更多      结束*************/

  /***********接口调用    开始***************/
  /* 公用调用接口    查询数据
  * url:必传
  * */
  getList(url, event?): any{
    let list = [];
    this.loading.showLoading();
    this.getListInterface(url).subscribe(data=>{
      list = data['results'];
      if(list.length === 0){
        this.errMsg = ErrMsg.NULL;
      }else{
        if(event){
          this.dataList = this.dataList.concat(list);
        }else{
          this.dataList = list;
        }
      }
    },err=>{
      this.loading.hideLoading();
      if (event) {    //上拉加载数据
        event.complete();
      }
      this.errMsg = ErrMsg.FAIL;
    },()=>{
      this.loading.hideLoading();
      if (event) {    //上拉加载数据
        event.complete();
      }
    });
  }

  getListInterface(url): Observable<any> {
    return this.http.get(url);
  }
  /***********接口调用    结束****************/
}
