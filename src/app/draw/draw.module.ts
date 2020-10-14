import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw/draw.component';
import { CanvasDrawDirective } from './canvas-draw.directive';



@NgModule({
  declarations: [DrawComponent, CanvasDrawDirective],
  imports: [
    CommonModule
  ]
})
export class DrawModule { }
