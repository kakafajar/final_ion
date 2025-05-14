import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TakeAwayPage } from './take-away.page';

const routes: Routes = [
  {
    path: '',
    component: TakeAwayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TakeAwayPageRoutingModule {}
