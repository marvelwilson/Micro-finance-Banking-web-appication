import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CfdPage } from './cfd.page';

const routes: Routes = [
  {
    path: '',
    component: CfdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CfdPageRoutingModule {}
