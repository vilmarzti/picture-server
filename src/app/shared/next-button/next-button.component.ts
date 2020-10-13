import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../picture.service';

@Component({
  selector: 'app-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss']
})
export class NextButtonComponent implements OnInit {
  public id: number = 0;
  public next_id: number = 0;
  public pos_inf = Number.POSITIVE_INFINITY;

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    // get current param
    this.route.params.subscribe(params => {
      this.id = params['id'];

      // get next param
      this.pictureService.getAllPictures().subscribe(
        pictures => {
          let index = pictures.findIndex(
            pic => pic.id === +this.id
          )
          if (index === pictures.length - 1) this.next_id = Number.POSITIVE_INFINITY
          else this.next_id = pictures[index += 1].id
        },
        err => {
          console.log(err);
        }
      );
    });
  }
}
