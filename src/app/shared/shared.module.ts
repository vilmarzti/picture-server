import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NextButtonComponent } from './next-button/next-button.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { PrevButtonComponent } from './prev-button/prev-button.component';
import { PositionComponent } from './position/position.component';
import { MatIconModule } from '@angular/material/icon';
import { ShareButtonComponent } from './share-button/share-button.component';



@NgModule({
  declarations: [NextButtonComponent, PrevButtonComponent, PositionComponent, ShareButtonComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    MatIconModule
  ],
  exports: [
    NextButtonComponent,
    PrevButtonComponent,
    PositionComponent,
    ShareButtonComponent
  ]
})
export class SharedModule { }
