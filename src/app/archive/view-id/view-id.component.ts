import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-view-id',
  templateUrl: './view-id.component.html',
  styleUrls: ['./view-id.component.scss']
})
export class ViewIdComponent implements OnInit {
  public picture: Picture;
  constructor(
    private pictureService: PictureService,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pictureService.getPicture(+params['id']).subscribe(
      picture =>{
        this.picture = picture;
        console.log(this.picture.titles);
      },
      error =>{
        console.log(error);
      });
    });
  }
}
