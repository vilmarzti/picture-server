import { Component, OnInit } from '@angular/core';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  constructor(private pictureService: PictureService) { }

  public index = 0;
  public length = 0;

  ngOnInit(): void {
    this.pictureService.currentIndex.subscribe(
      number => this.index = number
    )

    this.pictureService.pictureLength.subscribe(
      number => this.length = number
    )
  }
}
