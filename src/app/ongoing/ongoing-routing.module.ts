import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OngoingPage } from './ongoing.page';

const routes: Routes = [
  {
    path: '',
    component: OngoingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OngoingPageRoutingModule {}
