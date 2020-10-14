import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pid } from 'process';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-prev-button',
  templateUrl: './prev-button.component.html',
  styleUrls: ['./prev-button.component.scss']
})
export class PrevButtonComponent implements OnInit {
  @Input() base_url = "";
  @Input() first_url = "";

  public id: number = 0;
  public prev_id: number = 0;
  public isNan: Function = Number.isNaN;

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.pictureService.prevId.subscribe(
      id => this.prev_id = id
    )
  }
}
