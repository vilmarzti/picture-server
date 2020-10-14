import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw/draw.component';
import { CanvasDrawDirective } from './canvas-draw.directive';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [DrawComponent, CanvasDrawDirective],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DrawModule { }
