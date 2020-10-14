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
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.id = +params['id']

        this.pictureService.getAllPictures().subscribe(
          pictures => {
            let index = pictures.findIndex(
              pic => pic.id ===this.id
            );
            if (index <= 0) this.prev_id = NaN
            else this.prev_id = pictures[index -1].id
          },
          err =>{
            console.log(err)
          }
        )
      }
    )
  }

}
