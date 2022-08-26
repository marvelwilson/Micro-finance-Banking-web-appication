import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BanksPage } from './banks.page';

const routes: Routes = [
  {
    path: '',
    component: BanksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BanksPageRoutingModule {}
