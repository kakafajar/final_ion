import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiwayatPesananPage } from './riwayat-pesanan.page';

const routes: Routes = [
  {
    path: '',
    component: RiwayatPesananPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiwayatPesananPageRoutingModule {}
