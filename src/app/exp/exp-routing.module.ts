import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpPage } from './exp.page';

const routes: Routes = [
  {
    path: '',
    component: ExpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpPageRoutingModule {}
