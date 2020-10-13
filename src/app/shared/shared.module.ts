import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextButtonComponent } from './next-button/next-button.component';



@NgModule({
  declarations: [NextButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [
    NextButtonComponent
  ]
})
export class SharedModule { }
