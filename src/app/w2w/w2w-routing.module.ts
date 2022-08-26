import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { W2wPage } from './w2w.page';

const routes: Routes = [
  {
    path: '',
    component: W2wPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class W2wPageRoutingModule {}
