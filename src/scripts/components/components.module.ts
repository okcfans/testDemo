import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PageNullComponent } from './page-null/page-null';
import {LocationSelectModal} from './location-select/location-select-modal';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
	declarations: [

    PageNullComponent,
    LocationSelectModal

  ],
	imports: [
	  IonicModule,
    PipesModule
  ],
	exports: [

    PageNullComponent,
    LocationSelectModal,
  ],
  entryComponents: [

  ],
})
export class ComponentsModule {}
