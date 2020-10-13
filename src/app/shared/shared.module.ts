import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextButtonComponent } from './next-button/next-button.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NextButtonComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    NextButtonComponent
  ]
})
export class SharedModule { }
