import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReconPage } from './recon.page';

const routes: Routes = [
  {
    path: '',
    component: ReconPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReconPageRoutingModule {}
