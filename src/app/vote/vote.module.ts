import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteIdComponent } from './vote-id/vote-id.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { VoteAllComponent } from './vote-all/vote-all.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { VoteInfoComponent } from './vote-info/vote-info.component';
import { VoteByeComponent } from './vote-bye/vote-bye.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [VoteIdComponent, VoteAllComponent, VoteInfoComponent, VoteByeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class VoteModule { }
