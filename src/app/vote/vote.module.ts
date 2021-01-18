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
import { MatIconModule } from '@angular/material/icon';
import { InfoPopupDirective } from './vote-id/info-popup.directive';
import { OverlayModule } from '@angular/cdk/overlay';



@NgModule({
  declarations: [
    VoteIdComponent,
    VoteInfoComponent,
    VoteByeComponent,
    InfoPopupDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    MatIconModule,
    OverlayModule
  ]
})
export class VoteModule { }
