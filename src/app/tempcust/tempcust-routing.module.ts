import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TempcustPage } from './tempcust.page';

const routes: Routes = [
  {
    path: '',
    component: TempcustPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TempcustPageRoutingModule {}
