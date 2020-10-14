import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoteModule } from './vote/vote.module';
import { ArchiveModule } from './archive/archive.module';
import { GeneralModule } from './general/general.module';
import { DrawModule } from './draw/draw.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    VoteModule,
    ArchiveModule,
    GeneralModule,
    DrawModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
