/**
 * 此处定义项目中需要用到的常量
 * 使用方法：
 * 1.在需要使用的ts文件中引入常量
 */

// 存储本地数据对应的keys
export const LocalStorageKeys = {
  TOKEN: 'token',    // token值
  EMPLOYID: 'employId', //员工id
  BusinessPartnerID: 'BusinessPartnerID', // 工程师id
  USERID: 'userId',   // 用户id
  USERINFO: 'userInfo', //用户信息
  XCSRFTOKEN: 'xCsrfToken',  //basic方式下的CSF令牌
  XMP_APPCID: 'APPCID',  //basic方式下的applicationid
  VERSION: 'version'  //版本信息
};

//请求数据失败信息
export const ErrMsg = {
  NULL: '没有相应数据',
  FAIL: '获取数据失败'
};

// 图片地址
export const ImgUrl = {
  Base64: 'data:image/jpg;base64,'
};

// 意向时长下拉列表
export const ZDemandTimeList=[
  {value:'101',text:'大于30天'},
  {value:'111',text:'小于或等于30天'}
];

// 工程情况下拉列表
export const ZProjectsituationList=[
  {value:'101',text:'未落实'},
  {value:'111',text:'已落实'}
];

// 资金准备下拉列表
export const ZFundPreparationList=[
  {value:'101',text:'待到位'},
  {value:'111',text:'已到位'}
];

//中介类型下拉列表
export const ZMediationTypeList=[
  {value:'101',text:'老客户'},
  {value:'111',text:'同行客户'},
  {value:'121',text:'同行业务员'},
  {value:'131',text:'管工/机手'},
  {value:'141',text:'纯中介'},
  {value:'151',text:'合伙人'}
];

//产品属性下拉列表
export const ZTypeList=[
  {value:'101',text:'新机'},
  {value:'111',text:'二手机置换机'},
  {value:'121',text:'二手债权机'},
];

//工程类型下拉列表
export const ZGCtypeList=[
  {value:'101',text:'公路'},
  {value:'111',text:'矿山'},
  {value:'121',text:'石场'},
  {value:'131',text:'油田'},
  {value:'141',text:'工程分包'},
  {value:'151',text:'水利水电'},
  {value:'161',text:'钢铁行业'},
  {value:'171',text:'市政建设'},
  {value:'181',text:'房地产'},
  {value:'191',text:'租赁'},
  {value:'201',text:'港口'},
  {value:'211',text:'新农村建设'},
  {value:'221',text:'铁路'},
  {value:'231',text:'农林牧业'}
];

//配置下拉列表
export const ZConfigList=[
  {value:'111',text:'岩石型'},
  {value:'121',text:'小5吨'},
  {value:'131',text:'大5吨'},
];

// 客户角色
export const Role = [
  {code: 'CRM000', text: '成交客户'},
  {code: 'BUP002', text: '潜在客户'}
];

// 客户主体
export const ZCustomerMainBody = [
  {code: '101', text: '个人客户'},
  {code: '102', text: '企业客户'}
];

// 性别
export const ZSex = [
  {code: '101', text: '男', check: false},
  {code: '102', text: '女', check: false}
];

// 客户等级
export const ABCClassification = [
  {code: '1', text: '一般客户'},
  {code: 'A', text: '大客户'}
];

// 客户性质
export const ZCustomerProperty = [
  {code: '101', text: '购机老客户'},
  {code: '102', text: '新入行客户'},
  {code: '103', text: '竞品客户'},
  {code: '104', text: '纯中介'}
];

// 行业类型
export const Industry = [
  {code: 'Z01', text: '公路'},
  {code: 'Z02', text: '环保/垃圾处理'},
  {code: 'Z03', text: '其他'},
  {code: 'Z101', text: '港口'},
  {code: 'Z11', text: '矿山'},
  {code: 'Z111', text: '新农村建设'},
  {code: 'Z121', text: '铁路'},
  {code: 'Z131', text: '农林牧业'},
  {code: 'Z21', text: '石场'},
  {code: 'Z31', text: '油田'},
  {code: 'Z41', text: '工程分包'},
  {code: 'Z51', text: '水利水电'},
  {code: 'Z61', text: '钢铁行业'},
  {code: 'Z71', text: '市政建设'},
  {code: 'Z81', text: '房地产'},
  {code: 'Z91', text: '租赁'}
];

// 证件类型
export const ZCredentials = [
  {code: '101', text: '身份证'},
  {code: '102', text: '营业执照'}
];

// 联系人类型
export const ZContactType = [
  {code: '101', text: '机手', belong: '101'},
  {code: '111', text: '设备管理员', belong: '101'},
  {code: '121', text: '合伙人', belong: '102'},
  {code: '131', text: '丈夫', belong: '101'},
  {code: '141', text: '妻子', belong: '101'},
  {code: '151', text: '兄弟', belong: '101'},
  {code: '161', text: '父母', belong: '101'},
  {code: '171', text: '子女', belong: '101'},
  {code: '181', text: '其他亲属', belong: '101'},
  {code: '191', text: '法人', belong: '102'},
  {code: '201', text: '采购负责人', belong: '102'},
  {code: '211', text: '业务负责人', belong: '102'},
];

export const PartyRole = [
  {code: '146', text: '代理-服务'},
  {code: '142', text: '负责员工-销售'},
  {code: '1122', text: '合同管理员'},
  {code: '213', text: '合作伙伴联系人'},
  {code: '43', text: '技术服务工程师'},
  {code: '211', text: '客户团队成员'},
  {code: '46', text: '销售人员'},
  {code: 'Z10', text: '债权人员'}
];

// 设备工程
export const EquipmentEngineering = [
  {code: 'Z01', text: '公路'},
  {code: 'Z02', text: '环保/垃圾处理'},
  {code: 'Z03', text: '其他'},
  {code: 'Z101', text: '港口'},
  {code: 'Z11', text: '矿山'},
  {code: 'Z111', text: '新农村建设'},
  {code: 'Z121', text: '铁路'},
  {code: 'Z131', text: '农林牧业'},
  {code: 'Z21', text: '石场'},
  {code: 'Z31', text: '油田'},
  {code: 'Z41', text: '工程分包'},
  {code: 'Z51', text: '水利水电'},
  {code: 'Z61', text: '钢铁行业'},
  {code: 'Z71', text: '市政建设'},
  {code: 'Z81', text: '房地产'},
  {code: 'Z91', text: '租赁'}
];

// 拜访目的
export const VisitType = [
  {code: 'Z001', text: '客情维护'},
  {code: 'Z002', text: '市场开拓'},
  {code: 'Z003', text: '商机拜访'},
  {code: 'Z004', text: '材料收集'},
  {code: 'Z005', text: '合同签订'},
  {code: 'Z006', text: '交机'},
  {code: 'Z007', text: '定金收取'},
  {code: 'Z008', text: '债权催收'},
  {code: 'Z009', text: '赠送'},
  {code: 'Z010', text: '二手机评估'}
];

// 拜访方式
export const VisitMethod = [
  {code: 'Z101', text: '客户来访'},
  {code: 'Z102', text: '上门拜访'},
  {code: 'Z103', text: '电话拜访'}
];

// 收款应收类型 value:接口值，code:对应二维码code，text:展示
export const ReceiptType = [
  // {value:'1',code: '', text: '首付款'},
  {value:'2',code: 'C', text: '首付借款'},
  {value:'3',code: 'D', text: '租金'},
  // {value:'4',code: '', text: '全款'},
  {value:'5',code: 'A', text: '实际提机款'},
  // {value:'6',code: '', text: '合计'},
  {value:'Z',code: 'B', text: '垫款'}
];

// 收款销售方式 code:对应二维码code，text:展示
export const ReceiptSaleMethod = [
  {value: '101', code: 'A', text: '全款'},
  {value: '111', code: 'B', text: '分期'},
  {value: '121', code: 'C', text: '融资租赁'},
  {value: '131', code: 'D', text: '银行按揭'},
];

// 还款计划还款类型
export const RepayType = [
  {code: '2', text: '首付借款'},
  {code: '3', text: '租金'},
  {code: '5', text: '实际提机款'},
  {code: '6', text: '合计'}
];

// 报销类型
export const ExpenseType = [
  {code: '1', text: '普通报销'},
  {code: '2', text: '差旅报销'},
  {code: '3', text: '日清报销'}
];

// 费用类型与子类型
export const CostType = [
  {
    code: '01',
    text: '差旅费',
    sub: [
      {code: '01', text: '一般差旅费'},
      {code: '02', text: '市内交通费'}
    ]
  },
  {
    code: '02',
    text: '车辆使用费',
    sub: [
      {code: '03', text: '油料费'},
      {code: '04', text: '路桥停车费'},
      {code: '05', text: '维修保养费'},
      {code: '06', text: '年检保险费'},
      {code: '07', text: '车辆租赁费'}
    ]
  },
  {
    code: '03',
    text: '办公费',
    sub: [
      {code: '08', text: '办公用品'},
      {code: '09', text: '办公杂费'},
      {code: '10', text: '水电费'},
      {code: '11', text: '维修维护费'}
    ]
  },
  {
    code: '04',
    text: '邮电通讯费',
    sub: [
      {code: '12', text: '手机话费'},
      {code: '13', text: '固定话费'},
      {code: '14', text: '邮寄费'},
      {code: '15', text: '网络通讯费'}
    ]
  },
  {code: '05', text: '物业管理费'},
  {
    code: '06',
    text: '邮电通讯费',
    sub: [
      {code: '17', text: '水费'},
      {code: '18', text: '电费'},
      {code: '19', text: '燃气费'}
    ]
  },
  {code: '07', text: '咨询管理费'},
  {code: '08', text: '诉讼费'},
  {code: '09', text: '审计评估费'},
  {code: '10', text: '会务费'},
  {code: '11', text: '广告宣传费'},
  {
    code: '12',
    text: '促销费',
    sub: [
      {code: '25', text: '运费'},
      {code: '26', text: '赠品'},
      {code: '27', text: '其他'},
      {code: '28', text: '佣金'}
    ]
  },
  {code: '13', text: '劳务费'},
  {
    code: '14',
    text: '业务招待费',
    sub: [
      {code: '30', text: '餐饮费'},
      {code: '31', text: '业务费'},
      {code: '32', text: '其他招待'}
    ]
  },
  {
    code: '15',
    text: '维修维护费',
    sub: [
      {code: '33', text: '主机维修维护费'},
      {code: '34', text: '日常维护费'}
    ]
  },
  {
    code: '16',
    text: '运输装卸费',
    sub: [
      {code: '35', text: '主机'},
      {code: '36', text: '配件'},
      {code: '37', text: '其他'}
    ]
  },
  {
    code: '17',
    text: '员工薪酬与福利',
    sub: [
      {code: '38', text: '福利费-职工餐费'},
      {code: '39', text: '福利费-宿舍租金'},
      {code: '40', text: '福利费-宿舍水电燃气费'},
      {code: '41', text: '福利费-宿舍物业费'},
      {code: '42', text: '福利费-文艺娱乐费'},
      {code: '43', text: '福利费-节日福利'},
      {code: '55', text: '福利费-商业保险'},
      {code: '45', text: '福利费-其他福利'},
      {code: '46', text: '职工教育费'}
    ]
  },
  {code: '18', text: '工会经费'},
  {code: '19', text: '开办费'},
  {
    code: '20',
    text: '租赁费',
    sub: [
      {code: '49', text: '房租'},
      {code: '50', text: '场地'},
      {code: '51', text: '其他'}
    ]
  },
  {code: '21', text: '折旧费'},
  {
    code: '22',
    text: '长期待摊费用',
    sub: [
      {code: '53', text: '装修'},
      {code: '54', text: '房租'},
      {code: '55', text: '系统维护费'}
    ]
  },
  {code: '23', text: '包装费'},
  {code: '24', text: '样板费'},
  {code: '25', text: '策划费'},
  {code: '26', text: '备案费'},
  {code: '27', text: '考察调研费'},
  {code: '28', text: '印刷费'},
  {code: '29', text: '招商代理费'},
  {code: '30', text: '保安服务费'},
  {code: '31', text: '招聘费'},
  {code: '32', text: '劳保费'},
  {code: '33', text: '垃圾清运费'},
  {code: '34', text: '消防费'},
  {code: '35', text: '装饰费'},
  {code: '36', text: '清洁费'},
  {code: '37', text: '营销活动费'},
  {code: '38', text: '营销物料费'},
  {code: '39', text: '其他费用'}
];

// export const CostType = {
//   travel: {
//     code: '01',
//     text: '差旅费',
//     sub: {
//       general: {code: '01', text: '一般差旅费'},
//       traffic: {code: '02', text: '市内交通费'}
//     }
//   },
//   vehicle: {
//     code: '02',
//     text: '车辆使用费',
//     sub: {
//       oil: {code: '03', text: '油料费'},
//       parking: {code: '04', text: '路桥停车费'},
//       maintain: {code: '05', text: '维修保养费'},
//       insurance: {code: '06', text: '年检保险费'},
//       lease: {code: '07', text: '车辆租赁费'}
//     }
//   },
//   office: {
//     code: '03',
//     text: '办公费',
//     sub: {
//       supplies: {code: '08', text: '办公用品'},
//       others: {code: '09', text: '办公杂费'},
//       power: {code: '10', text: '水电费'},
//       maintain: {code: '11', text: '维修维护费'}
//     }
//   },
//   communication: {
//     code: '04',
//     text: '邮电通讯费',
//     sub: {
//       mobile: {code: '12', text: '手机话费'},
//       fixed: {code: '13', text: '固定话费'},
//       mail: {code: '14', text: '邮寄费'},
//       net: {code: '15', text: '网络通讯费'}
//     }
//   },
//   property: {code: '05', text: '物业管理费'},
//   energy: {
//     code: '06',
//     text: '邮电通讯费',
//     sub: {
//       water: {code: '17', text: '水费'},
//       electricity: {code: '18', text: '电费'},
//       gas: {code: '19', text: '燃气费'}
//     }
//   },
//   advisory: {code: '07', text: '咨询管理费'},
//   litigation: {code: '08', text: '诉讼费'},
//   audit: {code: '09', text: '审计评估费'},
//   meeting: {code: '10', text: '会务费'},
//   advertising: {code: '11', text: '广告宣传费'},
//   promotion: {
//     code: '12',
//     text: '促销费',
//     sub: {
//       freight: {code: '25', text: '运费'},
//       gift: {code: '26', text: '赠品'},
//       others: {code: '27', text: '其他'},
//       commission: {code: '28', text: '佣金'}
//     }
//   },
//   labour: {code: '13', text: '劳务费'},
//   entertain: {
//     code: '14',
//     text: '业务招待费',
//     sub: {
//       food: {code: '30', text: '餐饮费'},
//       business: {code: '31', text: '业务费'},
//       others: {code: '32', text: '其他招待'}
//     }
//   },
//   maintain: {
//     code: '15',
//     text: '维修维护费',
//     sub: {
//       host: {code: '33', text: '主机维修维护费'},
//       daily: {code: '34', text: '日常维护费'}
//     }
//   },
//   transport: {
//     code: '16',
//     text: '运输装卸费',
//     sub: {
//       host: {code: '35', text: '主机'},
//       fitting: {code: '36', text: '配件'},
//       others: {code: '37', text: '其他'}
//     }
//   },
//   salary: {
//     code: '17',
//     text: '员工薪酬与福利',
//     sub: {
//       food: {code: '38', text: '福利费-职工餐费'},
//       dormitory: {code: '39', text: '福利费-宿舍租金'},
//       power: {code: '40', text: '福利费-宿舍水电燃气费'},
//       property: {code: '41', text: '福利费-宿舍物业费'},
//       entertainment: {code: '42', text: '福利费-文艺娱乐费'},
//       festival: {code: '43', text: '福利费-节日福利'},
//       insurance: {code: '55', text: '福利费-商业保险'},
//       others: {code: '45', text: '福利费-其他福利'},
//       education: {code: '46', text: '职工教育费'}
//     }
//   },
//   union: {code: '18', text: '工会经费'},
//   start: {code: '19', text: '开办费'},
//   lease: {
//     code: '20',
//     text: '租赁费',
//     sub: {
//       house: {code: '49', text: '房租'},
//       place: {code: '50', text: '场地'},
//       others: {code: '51', text: '其他'}
//     }
//   },
//   depreciation: {code: '21', text: '折旧费'},
//   prepaid: {
//     code: '22',
//     text: '长期待摊费用',
//     sub: {
//       decoration: {code: '53', text: '装修'},
//       rent: {code: '54', text: '房租'},
//       system: {code: '55', text: '系统维护费'}
//     }
//   },
//   packing: {code: '23', text: '包装费'},
//   template: {code: '24', text: '样板费'},
//   plan: {code: '25', text: '策划费'},
//   filing: {code: '26', text: '备案费'},
//   research: {code: '27', text: '考察调研费'},
//   print: {code: '28', text: '印刷费'},
//   agent: {code: '29', text: '招商代理费'},
//   security: {code: '30', text: '保安服务费'},
//   recruitment: {code: '31', text: '招聘费'},
//   laborProtection: {code: '32', text: '劳保费'},
//   rubbish: {code: '33', text: '垃圾清运费'},
//   fire: {code: '34', text: '消防费'},
//   decorate: {code: '35', text: '装饰费'},
//   clean: {code: '36', text: '清洁费'},
//   marketingActivities: {code: '37', text: '营销活动费'},
//   marketingMaterials: {code: '38', text: '营销物料费'},
//   others: {code: '39', text: '其他费用'}
// };

// 费用报销状态
export const ERSubmitState = [
  {code: '1', text: '编辑中', color: 'color-doing'},
  {code: '2', text: '复核中', color: 'color-theme'},
  {code: '3', text: '审批中', color: 'color-theme'},
  {code: '4', text: '已驳回', color: 'color-danger'},
  {code: '5', text: '审批通过', color: 'color-green'},
  {code: '6', text: '财务确认', color: 'color-green'}
];

// 费用日清单据状态
export const ExpenseStatus = [
  {code: '1', text: '编辑中', color: 'color-theme', readonly: true},
  {code: '2', text: '待确认', color: 'color-doing', readonly: false},
  {code: '3', text: '已通过', color: 'color-secondary', readonly: false},
  {code: '4', text: '已经汇总报销', color: 'color-secondary', readonly: false},
  {code: '5', text: '已驳回', color: 'color-danger', readonly: true},
];

// 售前风控客户状态
export const CreditReportStatus = [
  {code: '1', text: '待派工'},
  {code: '2', text: '派工'},
  {code: '3', text: '进行中'},
  {code: '4', text: '已采集'},
  {code: '5', text: '驳回补充资料'},
  {code: '6', text: '已拒绝'},
  {code: '7', text: '已审核'},
  {code: '8', text: '待评估'},
  {code: '9', text: '风控完成'},
  {code: '10', text: '采集信息'},
  {code: '11', text: '待重新提交'},
  {code: '12', text: '已派工'},
  {code: '13', text: '已通过'}
];

//销售审批：融资机构
export const FinanceInsList=[
  {code: '101', text: '中恒国际租赁有限公司'},
  {code: '111', text: '斗山（中国）租赁有限公司'},
  {code: '121', text: '科誉高瞻融资租赁（中国）有限公司'},
  {code: '131', text: '约翰迪尔融资租赁有限公司'}
];

//销售审批：还款规则
export const RepayRule=[
  {code: '101', text: '规则还款'},
  {code: '102', text: '不规则还款'}
];

// 服务管理工单状态
export const AssignDutyStatus = [
  {code: 'Y1', text: '未派工'},
  {code: 'Y2', text: '派工'},
  {code: 'Z2', text: '到达'},
  {code: 'Z3', text: '出发'},
  {code: 'Z4', text: '中断'},
  {code: 'Z5', text: '失效'},
  {code: 'Z6', text: '预约'},
  {code: 'Z8', text: '完工'}
];

// 服务维修类型
export const ProcessingType = [
  {code: 'SRRQ', text: '到货检查'},
  {code: 'ZDCK', text: '发货检查'},
  {code: 'ZETM', text: '保外保养'},
  {code: 'ZETN', text: '保外维修'},
  {code: 'ZICT', text: '保内点检'},
  {code: 'ZIST', text: '保内维修'},
  {code: 'ZPTC', text: '样机索赔'},
  {code: 'ZSMP', text: '二手机评估'},
  {code: 'ZTPN', text: '样机点检'},
  {code: 'ZTUP', text: '批量整改'}
];

// 服务所属行业
export const ZIndustry = [
  {code: '141', text: '公路'},
  {code: '151', text: '环保/垃圾处理'},
  {code: '181', text: '其他'},
  {code: '121', text: '港口'},
  {code: '161', text: '矿山'},
  {code: '231', text: '新农村建设'},
  {code: '221', text: '铁路'},
  {code: '171', text: '农林牧业'},
  {code: '191', text: '石场'},
  {code: '241', text: '油田'},
  {code: '131', text: '工程分包'},
  {code: '211', text: '水利水电'},
  {code: '111', text: '钢铁行业'},
  {code: '201', text: '市政建设'},
  {code: '101', text: '房地产'},
  {code: '251', text: '租赁'}
];

// 服务工作类型
export const ZJobType = [
  {code: '101', text: '平滑'},
  {code: '102', text: '升降'},
  {code: '103', text: '踩踏'},
  {code: '104', text: '打桩'},
  {code: '105', text: '装载'},
  {code: '106', text: '挖掘'},
  {code: '107', text: '移动'},
  {code: '108', text: '倾斜作业'},
  {code: '109', text: '破碎'}
];

// 服务工作区域
export const ZWorkArea = [
  {code: '101', text: '河/运河/灌溉'},
  {code: '102', text: '雪原'},
  {code: '103', text: '道路铁路'},
  {code: '104', text: '海岸'},
  {code: '105', text: '建筑'},
  {code: '106', text: '土地开发'},
  {code: '107', text: '废品处理厂'},
  {code: '108', text: '农业'},
  {code: '109', text: '山林'},
  {code: '110', text: '隧道'},
  {code: '111', text: '矿山'},
  {code: '112', text: '采石场'},
  {code: '113', text: '其他'}
];

// 服务作业环境
export const ZWorkingEnvironment = [
  {code: '101', text: '岩石'},
  {code: '102', text: '炭矿'},
  {code: '103', text: '石子'},
  {code: '104', text: '硬石'},
  {code: '105', text: '湿地'},
  {code: '106', text: '沙子'},
  {code: '107', text: '土壤'},
  {code: '108', text: '其他'}
];

// 服务加装属具
export const ZRetrofitting = [
  {code: '101', text: '标准铲斗'},
  {code: '102', text: '宽铲斗'},
  {code: '103', text: '窄铲斗'},
  {code: '104', text: '石山用铲斗'},
  {code: '105', text: '破碎器'},
  {code: '106', text: '粉碎机'},
  {code: '107', text: '铁爪'},
  {code: '108', text: '清扫机'},
  {code: '109', text: '货叉'},
  {code: '110', text: '液压剪'},
  {code: '111', text: '压缩机'}
];

//服务派工状态
export const ServiceDispatchStatus = [
  {code: 'Y1', text: 0},                 //未派工
  {code: 'Y2', text: 1},                 //派工
  {code: 'Z6', text: 2},                 //预约
  {code: 'Z3', text: 3},                 //出发
  {code: 'Z2', text: 4},                 //到达
  {code: 'Z4', text: 5},                 //中断
  {code: 'Z5', text: 6},                 //失效
  {code: 'Z8', text: 7},                 //完工
];

// 服务代理商
export const ServiceAgent = [
  {code: '101', text: '广西加藤机械设备有限公司'},
  {code: '102', text: '贵州松宇机械设备有限公司'},
  {code: '103', text: '广州加藤机械设备有限公司'},
  {code: '104', text: '云南加藤机械设备有限公司'},
  {code: '105', text: '广西松宇机电设备有限公司'},
  {code: '106', text: '广州松宇斗山机械有限公司'},
  {code: '107', text: '广西千里通机械设备有限公司'},
  {code: '108', text: '广西千里通柳工机械营销有限公司'},
  {code: '109', text: '广西千里通柳工工业车辆销售有限公司'},
  {code: '110', text: '广西千里通配件营销有限公司'},
  {code: '111', text: '广东岩迪机械设备有限公司'},
  {code: '112', text: '湖北岩迪机械有限公司'},
  {code: '113', text: '广西岩迪机械有限公司'},
  {code: '114', text: '广西快易修科技有限公司'},
];

// 服务配件单位
export const PartUnits = [
  {code: 'ANN', text: '年'},
  {code: 'MON', text: '月'},
  {code: 'DAY', text: '天'},
  {code: 'WEE', text: '周'},
  {code: 'HUR', text: '小时'},
  {code: 'MIN', text: '分（时间单位）'},
  {code: 'SEC', text: '秒（时间单位）'},
  {code: 'EA', text: '个'},
  {code: 'XBG', text: '袋'},
  {code: 'XBX', text: '盒'},
  {code: 'XCS', text: '箱'},
  {code: 'XSX', text: '套'},
  {code: 'ZT', text: '台'},
  {code: 'KGM', text: '千克'},
  {code: 'KMT', text: '公里'},
  {code: 'MTR', text: '米'},
  {code: 'MTQ', text: '立方米'},
  {code: 'P1', text: '百分比'}
];

//二手机评估   --》装破碎机 、是否出险过
export const SecondYesNo1 = [
  {code:'1',text:'是'},
  {code:'2',text:'否'},
];

//二手机评估   --》发票 、合格证
export const SecondYesNo2 = [
  {code:'1',text:'有'},
  {code:'2',text:'无'},
];

//二手机评估   --》作业方式
export const SecondWordModel = [
  {code:'1',text:'土方'},
  {code:'2',text:'石方'},
];

//二手机评估   --》外观
export const SecondFacade = [
  {code:'1',text:'小部分掉漆'},
  {code:'2',text:'大部分掉漆'},
];

//二手机评估状态
export const SecondEvaluationStatus = [
  {code:'1',text:'待最终评估'},
  {code:'2',text:'已最终评估'},
];

//二手机出库状态
export const SecondMallStatus = [
  {code:'1',text:'已入库'},
  {code:'2',text:'已出库'},
  {code:'3',text:'草稿'},
];

//二手机出租状态
export const SecondRentStatus = [
  {code:true,text:'已出租'},
  {code:false,text:'未出租'},
];

// 考勤类别
export const CheckingType = [
  {code: '1', text: '签到'},
  {code: '2', text: '签退'},
  {code: '3', text: '其他'}
];
