import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MgtgroupPage } from './mgtgroup.page';

const routes: Routes = [
  {
    path: '',
    component: MgtgroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MgtgroupPageRoutingModule {}
