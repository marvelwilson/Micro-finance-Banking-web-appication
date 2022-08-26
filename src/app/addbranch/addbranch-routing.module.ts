import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddbranchPage } from './addbranch.page';

const routes: Routes = [
  {
    path: '',
    component: AddbranchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddbranchPageRoutingModule {}
