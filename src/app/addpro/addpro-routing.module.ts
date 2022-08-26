import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddproPage } from './addpro.page';

const routes: Routes = [
  {
    path: '',
    component: AddproPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddproPageRoutingModule {}
