import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StafflistPage } from './stafflist.page';

const routes: Routes = [
  {
    path: '',
    component: StafflistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StafflistPageRoutingModule {}
