import { Component, ViewChild } from '@angular/core';
import { NavParams, Slides, ViewController } from 'ionic-angular';
import { ClientInfoService } from '../../../pages/client-info/client-info.service';
import { LoadingService } from '../../service/loading.service';
import { ENV } from '@app/env';
import { InterfaceAddMap } from '../../constant/interface-address-map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'select-product-modal',
  templateUrl: 'select-product-modal.html'
})
export class SelectProductModalComponent {

  @ViewChild('productSlides') slides: Slides;
  isAccessories: boolean = false;
  isFixed: boolean = false;
  selected: Array<any> = [];
  searchMaterialText: string = '';
  searchBrandText: string = '';
  searchProductText: string = '';
  material: any = [];
  tempMaterial: any;
  brand: any = [];
  tempBrand: any;
  product: any = [];
  tempProduct: any;

  internalId: string;
  brandId: string;

  constructor(
    private navParams: NavParams,
    private http: HttpClient,
    private view: ViewController,
    private clientInfoService: ClientInfoService,
    private loading: LoadingService
  ) {
    this.isAccessories = this.navParams.get('isAccessories');
    this.isFixed = this.navParams.get('isFixed');
    if (this.isAccessories) {
      this.brandId = this.navParams.get('brandId');
    }
    if (this.isFixed) {
      this.internalId = this.navParams.get('internalId');
      this.brandId = this.navParams.get('brandId');
    }
    this.loadProductMaterial();
  }

  // 搜索
  searchMaterial() {
    this.material = JSON.parse(JSON.stringify(this.tempMaterial));
    this.material = this.material.filter((item) => {
      return ((item.ProductCategoryHierarchyDescription[0].Description.indexOf(this.searchMaterialText)) > -1);
    });
  }
  searchBrand() {
    this.brand = JSON.parse(JSON.stringify(this.tempBrand));
    this.brand = this.brand.filter((item) => {
      return ((item.ProductCategoryHierarchyDescription[0].Description.indexOf(this.searchBrandText)) > -1);
    });
  }
  searchProduct() {
    this.product = JSON.parse(JSON.stringify(this.tempProduct));
    this.product = this.product.filter((item) => {
      return ((item.Description.indexOf(this.searchProductText)) > -1);
    });
  }

  // 清空搜索
  searchClear() {
    if (this.searchMaterialText === '' && this.slides.getActiveIndex() === 0) {
      this.searchMaterial();
    }
    if (this.searchBrandText === '' && this.slides.getActiveIndex() === 1) {
      this.searchBrand();
    }
    if (this.searchProductText === '' && this.slides.getActiveIndex() === 2) {
      this.searchProduct();
    }
  }

  loadProductMaterial() {
    this.loading.showLoading();
    let internal: string = "Z31*";
    if (this.isAccessories) {
      internal = "Z31009";
    }
    if (this.isFixed) {
      internal = this.internalId;
    }
    let url = ENV.interfacePath +
      InterfaceAddMap[ENV.msType].standardAddOld +
      "/ProductCategoryHierarchyCollection?" +
      "$format=json&$top=10000&$expand=ProductCategoryHierarchyDescription&" +
      "$filter=InternalID eq '"+internal+"'&$select=InternalID,ProductCategoryHierarchyDescription/Description";
    this.http.get(url).subscribe(data => {
      this.material = data['results'];
      this.tempMaterial = data['results'];
    }, err => {
      this.loading.hideLoading();
      this.loading.showBaseAlert(err['message']['value']);
    }, () => {
      this.loading.hideLoading();
    });
  }

  selectProductMaterial(material) {
    this.internalId = material['InternalID'];
    this.selected.push(material);
    this.loadProductBrand();
  }

  loadProductBrand() {
    this.loading.showLoading();
    let url = ENV.interfacePath +
      InterfaceAddMap[ENV.msType].standardAddOld +
      "/ProductCategoryHierarchyCollection?" +
      "$format=json&$top=10000&$expand=ProductCategoryHierarchyDescription&" +
      "$select=InternalID,ProductCategoryHierarchyDescription/Description&" +
      "$filter=InternalID eq '"+(this.isAccessories?this.brandId:"Z61*")+"'";
    this.http.get(url).subscribe(data => {
      this.brand = data['results'];
      this.tempBrand = data['results'];
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      // this.tempMaterial = JSON.parse(JSON.stringify(this.material));
      this.material = [];
    }, err => {
      this.loading.hideLoading();
      this.loading.showBaseAlert(err['message']['value']);
    }, () => {
      this.loading.hideLoading();
    });
  }

  selectProductBrand(brand) {
    this.brandId = brand['InternalID'];
    this.selected.push(brand);
    this.loadProduct();
  }

  loadProduct() {
    this.loading.showLoading();
    let url = ENV.interfacePath +
      InterfaceAddMap[ENV.msType].machinetype +
      "/MaterialCollection?" +
      "$format=json&$top=10000&" +
      "$filter=InternalID1 eq '" + this.internalId + "' and BrandId eq '" + this.brandId + "'&" +
      "$select=InternalID1,BrandId,BranName,Description,InternalID";
    this.http.get(url).subscribe(data => {
      this.product = data['results'];
      this.tempProduct = data['results'];
      this.slides.lockSwipes(false);
      this.slides.slideNext();
      this.slides.lockSwipes(true);
      // this.tempBrand = JSON.parse(JSON.stringify(this.brand));
      this.brand = [];
    }, err => {
      this.loading.hideLoading();
      this.loading.showBaseAlert(err['message']['value']);
    }, () => {
      this.loading.hideLoading();
    });
  }

  selectProduct(product) {
    let data: any;
    this.selected.push(product);
    if (this.selected.length === 3) {
      data = {
        productId: this.selected[2]['InternalID'],
        productDescription: this.selected[2]['Description'],
        brandId: this.selected[1]['InternalID'],
        brandName: this.selected[1]['ProductCategoryHierarchyDescription'][0]['Description'],
        materialId: this.selected[0]['InternalID'],
        materialName: this.selected[0]['ProductCategoryHierarchyDescription'][0]['Description']
      };
    }
    if (this.selected.length === 1) {
      data = {
        productId: this.selected[0]['InternalID'],
        productDescription: this.selected[0]['Description']
      };
    }
    console.log(data);
    this.view.dismiss(data).then(() => {
      this.selected = [];
    });
  }

  dismiss() {
    this.view.dismiss().then(() => {
      this.selected = [];
    });
  }

  prevStep(index) {
    this.selected.pop();
    if (index === 1) {
      this.material = JSON.parse(JSON.stringify(this.tempMaterial));
      this.brand = [];
    } else if (index === 2) {
      this.brand = JSON.parse(JSON.stringify(this.tempBrand));
      this.product = [];
    }
    this.slides.lockSwipes(false);
    this.slides.slidePrev();
    this.slides.lockSwipes(true);
  }

  ionViewDidEnter() {
    if (this.isFixed) {
      this.slides.lockSwipes(false);
      this.slides.slideTo(1);
      this.loadProduct();
    }
    this.slides.lockSwipes(true);
  }

}
