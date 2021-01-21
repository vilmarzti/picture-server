import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawComponent } from './draw/draw.component';
import { CanvasDrawDirective } from './draw/canvas-draw.directive';
import { RouterModule } from '@angular/router';
import { MoreComponent } from './more/more.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [DrawComponent, CanvasDrawDirective, MoreComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class MoreModule { }
