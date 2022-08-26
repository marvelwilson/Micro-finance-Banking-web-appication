import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccdashPage } from './accdash.page';

const routes: Routes = [
  {
    path: '',
    component: AccdashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccdashPageRoutingModule {}
