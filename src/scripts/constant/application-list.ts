import {Business} from '../../pages/business/business';
import {ClientInfoPage} from '../../pages/client-info/client-info';
import {Expense} from '../../pages/expense/expense';
import {ExpenseDayList} from '../../pages/expense-day-list/expense-day-list';
import {PreSaleWindControl} from '../../pages/pre-sale-wind-control/pre-sale-wind-control';
import {ReceiptPage} from '../../pages/receipt/receipt';
import {SalesApproval} from '../../pages/sales-approval/sales-approval';
import {SecondHandManagement} from '../../pages/second-hand-management/second-hand-management';
import {Visiting} from '../../pages/visiting/visiting';
import {ServiceManagement} from '../../pages/service-management/service-management';
import {StatisticalChart} from '../../pages/statistical-chart/statistical-chart';
import {CardPage} from '../../pages/card/card';
import {ReportFormPage} from "../../pages/report-form/report-form";

export const ApplicationList: any[] = [
  {
    src: 'assets/imgs/application/client@3x.png',
    text: '客户',
    name: 'clientInfo',
    page: ClientInfoPage
  }, {
    src: 'assets/imgs/application/clue@3x.png',
    text: '拜访',
    name: 'visiting',
    page: Visiting
  }, {
    src: 'assets/imgs/application/business@3x.png',
    text: '商机管理',
    name: 'business',
    page: Business
  }, {
    src: 'assets/imgs/application/sales-approval@3x.png',
    text: '销售审批',
    name: 'salesApproval',
    page: SalesApproval
  }, {
    src: 'assets/imgs/application/pre-sale-wind-control@3x.png',
    text: '售前风控',
    name: 'preSaleWindControl',
    page: PreSaleWindControl
  }, {
    src: 'assets/imgs/application/service-management@3x.png',
    text: '服务管理',
    name: 'serviceManagement',
    page: ServiceManagement
  }, {
    src: 'assets/imgs/application/collection@3x.png',
    text: '债权收款',
    name: 'receipt',
    page: ReceiptPage
  }, {
    src: 'assets/imgs/application/expense@3x.png',
    text: '费用报销',
    name: 'expense',
    page: Expense
  },{
    src: 'assets/imgs/application/second-hand-management@3x.png',
    text: '二手机管理',
    name: 'secondHand',
    page: SecondHandManagement
  }, {
    src: 'assets/imgs/application/expense-day-list@3x.png',
    text: '费用日清单',
    name: 'expenseDayList',
    page: ExpenseDayList
  },{
    src: 'assets/imgs/application/xinwengonggao@3x.png',
    text: '数据看板',
    name: 'statisticalChart',
    page: StatisticalChart
  }, {
    src: 'assets/imgs/application/renling@3x.png',
    text: '市场活动',
    name: 'kampania'
  }, {
    src: 'assets/imgs/application/zhiqin.png',
    text: '保险查勘',
    name: 'duty'
  }, {
    src: 'assets/imgs/card/card@3x.png',
    text: '考勤管理',
    name: 'card',
    page: CardPage
  }, {
    src: 'assets/imgs/application/xinwengonggao@3x.png',
    text: '员工报表',
    name: 'reportForm',
    page: ReportFormPage
  }
];
