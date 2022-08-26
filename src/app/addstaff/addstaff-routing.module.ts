import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddstaffPage } from './addstaff.page';

const routes: Routes = [
  {
    path: '',
    component: AddstaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstaffPageRoutingModule {}
