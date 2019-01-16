import { NgModule } from '@angular/core';
import { GetPhotosSheetDirective } from './get-photos-sheet/get-photos-sheet';
import { ImageView } from './image-view/image-view';
import {GeLocationsListDirective} from './get-locations-list/get-locations-list';
import { SelectCityDirective } from './select-city/select-city';
import { SelectProductDirective } from './select-product/select-product';

@NgModule({
	declarations: [
	  GetPhotosSheetDirective,
    GeLocationsListDirective,
    ImageView,
    SelectCityDirective,
    SelectProductDirective
  ],
	imports: [],
	exports: [
	  GetPhotosSheetDirective,
    GeLocationsListDirective,
    ImageView,
    SelectCityDirective,
    SelectProductDirective
  ]
})
export class DirectivesModule {}
