import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncPage } from './inc.page';

const routes: Routes = [
  {
    path: '',
    component: IncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncPageRoutingModule {}
