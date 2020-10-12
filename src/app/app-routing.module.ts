import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoteAllComponent } from './vote-all/vote-all.component';
import { VoteComponent } from './vote/vote.component';

const routes: Routes = [
  {
    path: 'vote/:id',
    component: VoteComponent
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
