import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { VoteModule } from './vote/vote.module';
import { ArchiveModule } from './archive/archive.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    VoteModule,
    ArchiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
