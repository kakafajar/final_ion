import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadComponent: () => import('./reservasi.page').then(m => m.ReservasiPage)
      }
    ])
  ],
  exports: [RouterModule]
})
export class ReservasiPageRoutingModule {}
