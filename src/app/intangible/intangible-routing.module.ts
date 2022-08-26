import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntangiblePage } from './intangible.page';

const routes: Routes = [
  {
    path: '',
    component: IntangiblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntangiblePageRoutingModule {}
