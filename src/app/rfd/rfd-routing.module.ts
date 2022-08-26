import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RfdPage } from './rfd.page';

const routes: Routes = [
  {
    path: '',
    component: RfdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RfdPageRoutingModule {}
