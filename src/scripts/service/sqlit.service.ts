import { Injectable } from '@angular/core';

/**
 * 本地数据存储
 * */
@Injectable()
export class SqlitService {

  database:any; //数据库
  transaction:any;

  constructor() {
  }

  /**
   * 创建数据库
   * */
  /*createDataBase(): Observable<any>{
    let _this = this;
    return Observable.create(function(observe){
      let option = {name: "syDB"};
      if(_this.platform.is('android')){
        option['location'] = 'default';
        option['androidDatabaseImplementation'] = 2;
      }
      console.log(option);
      (<any>window).sqlitePlugin.openDatabase(option,function(db){
        _this.database = db;
        console.log('打开数据库成功：',db);

        db.transaction(function (tx) {
          _this.transaction = tx;
          console.log('transaction成功：',tx);
          observe.next(db);
        },function(err){
          observe.error(err);
          console.log(err);
          console.log('打开数据库失败');
        });
      },function(err){
        observe.error(err);
        console.log(err);
        console.log('创建数据库失败');
      });
    });
  }*/

  createDataBase(){
    let _this = this;
    let option = {name: "syDB",location:'default'};
    console.log(option);
    let db = (<any>window).sqlitePlugin.openDatabase(option);
    _this.database = db;
  }

  /**
   * 创建表
   * */
  createTable(tableName:string,tableCol:Array<any>):Promise<any>{
    let _this = this;
    let sql = "CREATE TABLE IF NOT EXISTS "+tableName+" ("+tableCol.join(',')+")";
    return new Promise((resolve, reject) => {
      _this.database.transaction(function(tx){
        tx.executeSql(sql);
      },function (err) {
        console.log('创建表失败', err);
        reject(err);
      },function (res) {
        console.log('创建表成功', res);
        resolve(res);
      })
    });
  }

  /**
   * 新增数据
   * */
 /* insertData(tableName:string,insertCol:Array<any>,valueArr:Array<any>){
    let values = [];
    for(let val of insertCol){
      values.push('?');
    }
    let sql = 'INSERT INTO '+tableName+' ('+insertCol.join(',')+') VALUES ('+values.join(',')+')';
    console.log(sql);
    this.excuteSql(sql,valueArr);
  }*/


  /**
   * 查询数据
   * */
  select(sql): Promise<any>{
    let _this = this;
    return new Promise((resolve, reject) => {
      _this.database.transaction(function(tx){
        tx.executeSql(sql, [], function (tx, rs) {
          /*let results = [];
          console.log('getItem.length : ' , rs.rows);
          for(let i=0;i<rs.rows.length;i++){
            results.push(rs.rows.item(i));
          }
          console.log(results)*/
          resolve(rs.rows);
        }, function (tx, error) {
          reject( error.message);
          console.log('getItem error: ' + error.message);
        });
      },function (err) {},function (res) {})
    });
  }


  /**
   * 新增、更新、删除数据
   * */
  excuteSql(sql,value:Array<any>){
    this.database.transaction(function(tx){
      tx.executeSql(sql, value, function(tx, res) {
          console.log("insertId: " + res.insertId);
          console.log("rowsAffected: " + res.rowsAffected);
        },
        function(tx, error) {
          console.log('excute error: ' + error.message);
        });
    },function (err) {
      console.log(err);
    },function (res) {
      console.log(res);
    })
  }
}
