import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoteModule } from './vote/vote.module';
import { ArchiveModule } from './archive/archive.module';
import { GeneralModule } from './general/general.module';
import { MoreModule } from './more/more.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    VoteModule,
    ArchiveModule,
    GeneralModule,
    MoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
