import { Component, ViewChild } from '@angular/core';
import { Slides, ViewController } from 'ionic-angular';
import { ClientInfoService } from '../../../pages/client-info/client-info.service';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'select-city-modal',
  templateUrl: 'select-city-modal.html'
})
export class SelectCityModalComponent {

  @ViewChild('citySlides') slides: Slides;

  selected: Array<any> = [];

  province: any;
  tempProvince: any;
  city: any;
  tempCity: any;
  county: any;

  constructor(
    private view: ViewController,
    private clientInfoService: ClientInfoService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.loading.showLoading();
    this.loadAddressProvince();
  }

  loadAddressProvince() {
    this.clientInfoService.getAddressProvince().subscribe(data => {
      this.province = data['results'];
    }, err => {
      console.log(err);
    }, () => {
      this.loading.hideLoading();
    });
  }

  selectProvince(province) {
    this.selected.push({ZSHENGFEN: province['Code'], ZSHENGFENText: province['Description']});
    this.loading.showLoading();
    this.clientInfoService.getAddressCity(province['Code']).subscribe(data => {
      console.log(data);
      this.city = data['results'];
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      this.tempProvince = JSON.parse(JSON.stringify(this.province));
      this.province = [];
    }, err => {
      console.log(err);
    }, () => {
      this.loading.hideLoading();
    });
  }

  selectCity(city) {
    this.selected.push({ZCityID: city['CityID'], ZCityName: city['CityName']});
    this.loading.showLoading();
    this.clientInfoService.getAddressCounty(city['CityID']).subscribe(data => {
      console.log(data);
      this.county = data['results'];
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      this.tempCity = JSON.parse(JSON.stringify(this.city));
      this.city = [];
    }, err => {
      console.log(err);
    }, () => {
      this.loading.hideLoading();
    });
  }

  selectCounty(county) {
    if (this.selected.length === 3) {
      this.selected[2] = {ZCountyID: county['CountyID'], ZCountyName: county['CountyName']};
    } else {
      this.selected.push({ZCountyID: county['CountyID'], ZCountyName: county['CountyName']});
    }
    this.view.dismiss(this.selected).then(() => {
      this.selected = [];
    });
  }

  getAddress() {
    switch (this.selected.length) {
      case 1:
        return this.selected[0]['ZSHENGFENText'];
      case 2:
        return this.selected[0]['ZSHENGFENText'] + this.selected[1]['ZCityName'];
      case 3:
        return this.selected[0]['ZSHENGFENText'] + this.selected[1]['ZCityName'] + this.selected[2]['ZCountyName'];
      default:
        return '请选择省市区';
    }
  }

  dismiss() {
    this.view.dismiss().then(() => {
      this.selected = [];
    });
  }

  prevStep(index) {
    this.selected.pop();
    if (index === 1) {
      this.province = JSON.parse(JSON.stringify(this.tempProvince));
    } else if (index === 2) {
      this.city = JSON.parse(JSON.stringify(this.tempCity));
    }
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
  }

}
