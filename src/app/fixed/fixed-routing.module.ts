import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedPage } from './fixed.page';

const routes: Routes = [
  {
    path: '',
    component: FixedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedPageRoutingModule {}
