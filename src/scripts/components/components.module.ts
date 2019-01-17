import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { InlineRadioComponent } from './inline-radio/inline-radio';
import { PageNullComponent } from './page-null/page-null';
import {LocationSelectModal} from './location-select/location-select-modal';
import { ImageViewModal } from './image-view/image-view-modal';
import { PipesModule } from '../pipes/pipes.module';
import { ChooseEmployeeModal } from './choose-employee/choose-employee-modal';
import { CommChooseModal } from './comm-choose-modal/comm-choose-modal';

@NgModule({
	declarations: [
	  InlineRadioComponent,
    PageNullComponent,
    LocationSelectModal,
    ImageViewModal,
    ChooseEmployeeModal,
    CommChooseModal,
  ],
	imports: [
	  IonicModule,
    PipesModule
  ],
	exports: [
	  InlineRadioComponent,
    PageNullComponent,
    LocationSelectModal,
  ],
  entryComponents: [
    ImageViewModal,
    ChooseEmployeeModal,
    CommChooseModal
  ],
})
export class ComponentsModule {}
