import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoteModule } from './vote/vote.module';
import { ArchiveModule } from './archive/archive.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    VoteModule,
    ArchiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
