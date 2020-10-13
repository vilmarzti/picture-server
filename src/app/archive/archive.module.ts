import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewAllComponent } from './view-all/view-all.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ViewAllComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ArchiveModule { }
