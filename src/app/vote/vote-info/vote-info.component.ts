import { Component, OnInit } from '@angular/core';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrls: ['./vote-info.component.scss']
})
export class VoteInfoComponent implements OnInit {
  public base_url ="/vote"
  public continue_id: number = 0;
  public starting_id: number = 0;
  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.continue_id = this.pictureService.currentId;
    console.log(this.continue_id);
    this.pictureService.getAllPictures().subscribe(
      pictures =>{
        if(pictures.length > 0){
          this.starting_id = pictures[0].id
        }
      },
      err =>{
        console.log(err);
      }
    )
  }

}
