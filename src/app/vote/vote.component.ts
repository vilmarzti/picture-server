import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Picture } from '../interfaces/picture';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from '../service/picture.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) { }

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
