import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllComponent } from './archive/view-all/view-all.component';
import { VoteByeComponent } from './vote/vote-bye/vote-bye.component';
import { VoteIdComponent } from './vote/vote-id/vote-id.component';
import { VoteInfoComponent } from './vote/vote-info/vote-info.component';

const routes: Routes = [
  {
    path: 'vote/bye',
    component: VoteByeComponent
  },
  {
    path: 'vote/info',
    component: VoteInfoComponent
  },
  {
    path: 'vote/:id',
    component: VoteIdComponent
  },
  {
    path: 'vote/', 
    redirectTo: 'vote/info'
  },
  {
    path: 'archive',
    component: ViewAllComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
