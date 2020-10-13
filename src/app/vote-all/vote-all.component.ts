import { Component, OnInit } from '@angular/core';
import { Picture } from '../interfaces/picture';
import { PictureService } from '../service/picture.service';

@Component({
  selector: 'app-vote-all',
  templateUrl: './vote-all.component.html',
  styleUrls: ['./vote-all.component.scss']
})
export class VoteAllComponent implements OnInit {

  constructor(private pictureService: PictureService) { }

  public pictures: Picture[] = []

  ngOnInit(): void {
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