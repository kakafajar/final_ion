import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TakeAwayPageRoutingModule } from './take-away-routing.module';

import { TakeAwayPage } from './take-away.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TakeAwayPageRoutingModule
  ],
  declarations: [TakeAwayPage]
})
export class TakeAwayPageModule {}
