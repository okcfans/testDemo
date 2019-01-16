import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { ClientInfoService } from '../../../pages/client-info/client-info.service';
import { LoadingService } from '../../service/loading.service';
import { Client, ClientList } from '../../../pages/client-info/client.model';
import { VisitingService } from '../../../pages/visiting/visiting.service';

@Component({
  selector: 'select-person-modal',
  templateUrl: 'select-person-modal.html'
})
export class SelectPersonModalComponent {

  type: string;
  typeText: string;

  searchText: string;

  clientList: Array<ClientList> = [];
  employeeList: Array<{EmployeeID: string, FirstName: string, LastName: string}> = [];

  savedClientList: Array<ClientList> = [];
  savedEmployeeList: Array<{EmployeeID: string, FirstName: string, LastName: string}> = [];

  selectedClientId: string;
  selectedEmployee: {EmployeeID: string, FirstName: string, LastName: string};

  constructor(
    private navParams: NavParams,
    private clientInfoService: ClientInfoService,
    private visitingService: VisitingService,
    private loading: LoadingService,
    private view: ViewController
  ) {
    this.type = this.navParams.get('type');
    switch (this.type) {
      case 'client':
        this.typeText = '客户';
        this.loadClientList();
        break;
      case 'employee':
        this.typeText = '协访人';
        this.loadPartyList();
        break;
    }
  }

  /* 获取客户列表 */
  loadClientList() {
    this.loading.showLoading();
    this.clientInfoService.getAccountList(false, undefined, undefined, true).subscribe(data => {
      console.log(data);
      this.clientList = data['results'];
      this.savedClientList = data['results'];
    }, err => {
      console.log(err);
      this.loading.hideLoading();
      this.loading.showBaseAlert(err['message']['value']);
    }, () => {
      this.loading.hideLoading();
    });
  }

  /* 获取协访人列表 */
  loadPartyList() {
    this.loading.showLoading();
    this.visitingService.getVisitPartyList().subscribe(data => {
      console.log(data);
      this.employeeList = data['results'];
      this.savedEmployeeList = data['results'];
    }, err => {
      this.loading.hideLoading();
      this.loading.showBaseAlert(err['message']['value']);
    }, () => {
      this.loading.hideLoading();
    });
  }

  // 搜索
  searchItem() {
    switch (this.type) {
      case 'client':
        this.searchClient();
        break;
      case 'employee':
        this.searchEmployee();
        break;
    }
  }

  // 搜索客户
  searchClient() {
    this.clientList = JSON.parse(JSON.stringify(this.savedClientList));
    this.clientList = this.clientList.filter((item) => {
      return ((item.Name.indexOf(this.searchText)) > -1);
    });
  }

  // 搜索协访人
  searchEmployee() {
    this.employeeList = JSON.parse(JSON.stringify(this.savedEmployeeList));
    this.employeeList = this.employeeList.filter((item) => {
      let name = item.LastName + item.FirstName;
      return ((name.indexOf(this.searchText)) > -1);
    });
  }

  // 关闭modal
  dismiss() {
    this.view.dismiss();
  }

  // 确定按钮
  certain() {
    switch (this.type) {
      case 'client':
        this.selectClient();
        break;
      case 'employee':
        this.selectParty();
        break;
    }
  }

  // 选择客户
  selectClient() {
    this.loading.showLoading();
    this.clientInfoService.getAccountDetail(this.selectedClientId).subscribe(data => {
      const client: Client = data['results'][0];
      this.loading.hideLoading();
      this.view.dismiss(client);
    }, err => {
      this.loading.hideLoading();
      this.loading.showBaseAlert(err['message']['value']);
    });
  }

  // 选择协访人
  selectParty() {
    const employeeName = this.selectedEmployee.LastName + this.selectedEmployee.FirstName;
    const employee = {
      PartyID: this.selectedEmployee.EmployeeID,
      RoleCode: '36',
      RoleCodeText: '参与者'
    };
    this.view.dismiss({
      employeeName: employeeName,
      employee: employee
    });
  }

}
