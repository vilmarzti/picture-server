import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoteComponent } from './vote/vote.component';
import { HttpClientModule } from '@angular/common/http';
import { VoteAllComponent } from './vote-all/vote-all.component';

@NgModule({
  declarations: [
    AppComponent,
    VoteComponent,
    VoteAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
