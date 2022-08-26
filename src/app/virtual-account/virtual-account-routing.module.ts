import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtualAccountPage } from './virtual-account.page';

const routes: Routes = [
  {
    path: '',
    component: VirtualAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtualAccountPageRoutingModule {}
