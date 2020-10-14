import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextButtonComponent } from './next-button/next-button.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PrevButtonComponent } from './prev-button/prev-button.component';



@NgModule({
  declarations: [NextButtonComponent, PrevButtonComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    NextButtonComponent,
    PrevButtonComponent
  ]
})
export class SharedModule { }
