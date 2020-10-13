import { Component, OnInit } from '@angular/core';
import { Picture } from '../../shared/picture';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from '../../shared/picture.service';

@Component({
  selector: 'app-vote-id',
  templateUrl: './vote-id.component.html',
  styleUrls: ['./vote-id.component.scss']
})
export class VoteIdComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) { }

  public id;
  public title: string;
  public picture: Picture;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pictureService.getPicture(+params['id']).subscribe(
        (data: Picture) =>{
          this.picture = data;
        },
        (err) =>{
          console.log(err);
        }
      )
    });
  }

  public vote(){
    console.log(this.title);
    this.pictureService.updateVote(this.picture.id, this.title).subscribe(
      (data: any) => {
        console.log(data);
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

}
