import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw/draw.component';
import { CanvasDrawDirective } from './draw/canvas-draw.directive';
import { RouterModule } from '@angular/router';
import { MoreComponent } from './more/more.component';
import { SharedModule } from '../shared/shared.module';
import { VideoPopupDirective } from './more/video-popup.directive';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [DrawComponent, CanvasDrawDirective, MoreComponent, VideoPopupDirective],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    OverlayModule,
    BrowserModule,
    FormsModule
  ]
})
export class MoreModule { }
