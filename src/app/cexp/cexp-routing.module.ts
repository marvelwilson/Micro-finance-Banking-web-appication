import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CexpPage } from './cexp.page';

const routes: Routes = [
  {
    path: '',
    component: CexpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CexpPageRoutingModule {}
