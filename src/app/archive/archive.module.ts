import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllComponent } from './view-all/view-all.component';
import { RouterModule } from '@angular/router';
import { ViewIdComponent } from './view-id/view-id.component';



@NgModule({
  declarations: [ViewAllComponent, ViewIdComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ArchiveModule { }
