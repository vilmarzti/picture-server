import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissingIdComponent } from './missing-id/missing-id.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [MissingIdComponent, HomeComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class GeneralModule { }
