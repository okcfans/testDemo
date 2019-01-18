import { NgModule } from '@angular/core';
import { GetPhotosSheetDirective } from './get-photos-sheet/get-photos-sheet';
import {GeLocationsListDirective} from './get-locations-list/get-locations-list';


@NgModule({
	declarations: [
	  GetPhotosSheetDirective,
    GeLocationsListDirective


  ],
	imports: [],
	exports: [
	  GetPhotosSheetDirective,
    GeLocationsListDirective


  ]
})
export class DirectivesModule {}
