import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteIdComponent } from './vote-id/vote-id.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VoteInfoComponent } from './vote-info/vote-info.component';
import { VoteByeComponent } from './vote-bye/vote-bye.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    VoteIdComponent,
    VoteInfoComponent,
    VoteByeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ]
})
export class VoteModule { }
