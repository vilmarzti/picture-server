import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteAllComponent } from './vote/vote-all/vote-all.component';
import { VoteIdComponent } from './vote/vote-id/vote-id.component';

const routes: Routes = [
  {
    path: 'vote/:id',
    component: VoteIdComponent
  },
  {
    path: 'vote',
    component: VoteAllComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
