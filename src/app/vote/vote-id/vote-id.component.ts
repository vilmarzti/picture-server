import { Component, OnInit } from '@angular/core';
import { Picture } from '../../shared/picture';
import { ActivatedRoute, Router } from '@angular/router';
import { PictureService } from '../../shared/picture.service';

@Component({
  selector: 'app-vote-id',
  templateUrl: './vote-id.component.html',
  styleUrls: ['./vote-id.component.scss']
})
export class VoteIdComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pictureService: PictureService
  ) { }

  public id;
  public title: string;
  public picture: Picture;
  public base_url = "/vote"
  private _nextId = 0;

  ngOnInit(): void {
    // get the next Id
    this.pictureService.nextId.subscribe(
      id =>{
        this._nextId = id;
      }
    );

    this.route.params.subscribe(params => {
      // reset title
      this.title = "";
      // set current id
      this.pictureService.currentId = +params['id'];
      // get the appropriate picture from the server
      this.pictureService.getPicture(+params['id']).subscribe(
        (data: Picture) =>{
          // save picture if found
          this.picture = data;
        },
        (err) =>{
          // redirect if picture is missing
          console.log(err);
          this.pictureService.currentId = NaN;
          this.router.navigate(['/general', 'missing'])
        }
      )
    });
  }

  public vote(){
    console.log(this.title);
    this.pictureService.updateVote(this.picture.id, this.title).subscribe(
      (data: any) => {
        if (isNaN(this._nextId)){
          this.router.navigate(['/vote', 'bye']);
        }
        else{
          this.router.navigate(['/vote', this._nextId]);
        }
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

}
