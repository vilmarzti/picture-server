import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewAllComponent } from './archive/view-all/view-all.component';
import { ViewIdComponent } from './archive/view-id/view-id.component';
import { DrawComponent } from './more/draw/draw.component'
import { HomeComponent } from './general/home/home.component';
import { MissingIdComponent } from './general/missing-id/missing-id.component';
import { VoteByeComponent } from './vote/vote-bye/vote-bye.component';
import { VoteIdComponent } from './vote/vote-id/vote-id.component';
import { MoreComponent } from './more/more/more.component';

const routes: Routes = [
  {
    path: 'vote/bye',
    component: VoteByeComponent
  },
  {
    path: 'vote/:id',
    component: VoteIdComponent
  },
  {
    path: 'vote', 
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'archiv',
    component: ViewAllComponent,
  },
  {
    path: 'archiv/:id',
    component: ViewIdComponent,
  },
  {
    path: 'general/missing',
    component: MissingIdComponent
  },
  {
    path: 'more/draw/:name',
    component: DrawComponent
  },
  {
    path: 'more/draw',
    redirectTo: 'more/draw/baseline'
  },
  {
    path: 'more',
    component: MoreComponent 
  },
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
