import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextButtonComponent } from './next-button/next-button.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PrevButtonComponent } from './prev-button/prev-button.component';
import { PositionComponent } from './position/position.component';



@NgModule({
  declarations: [NextButtonComponent, PrevButtonComponent, PositionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    NextButtonComponent,
    PrevButtonComponent,
    PositionComponent
  ]
})
export class SharedModule { }
