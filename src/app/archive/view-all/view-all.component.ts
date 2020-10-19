import { Component, OnInit } from '@angular/core';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit {

  constructor(private pictureService: PictureService) { }

  public pictures: Picture[] = []

  ngOnInit(): void {
    this.pictureService.random = false;
    this.pictureService.getAllPictures().subscribe(
      (data: Picture[]) =>{
        this.pictures = data;
      },
      (err) =>{
        console.log(err)
      }
    )
  }
}
