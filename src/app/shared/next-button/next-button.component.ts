import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss']
})
export class NextButtonComponent implements OnInit {
  @Input() base_url = "";
  @Input() last_url = "";

  public id: number = 0;
  public next_id: number = 0;
  public isNaN: Function = Number.isNaN;

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.pictureService.prevId.subscribe(
      id => this.next_id = id
    )
  }
}
