import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllComponent } from './archive/view-all/view-all.component';
import { ViewIdComponent } from './archive/view-id/view-id.component';
import { HomeComponent } from './general/home/home.component';
import { MissingIdComponent } from './general/missing-id/missing-id.component';
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
    path: 'vote', 
    redirectTo: 'vote/info',
    pathMatch: 'full'
  },
  {
    path: 'archive',
    component: ViewAllComponent,
  },
  {
    path: 'archive/:id',
    component: ViewIdComponent,
  },
  {
    path: 'general/missing',
    component: MissingIdComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '*',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
