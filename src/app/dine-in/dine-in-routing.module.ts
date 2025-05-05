import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DineInPage } from './dine-in.page';

const routes: Routes = [
  {
    path: '',
    component: DineInPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DineInPageRoutingModule {}
