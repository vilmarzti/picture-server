import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw/draw.component';
import { CanvasDrawDirective } from './draw/canvas-draw.directive';
import { RouterModule } from '@angular/router';
import { MoreComponent } from './more/more.component';



@NgModule({
  declarations: [DrawComponent, CanvasDrawDirective, MoreComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MoreModule { }
