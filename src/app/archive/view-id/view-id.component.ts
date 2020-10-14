import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-view-id',
  templateUrl: './view-id.component.html',
  styleUrls: ['./view-id.component.scss']
})
export class ViewIdComponent implements OnInit, OnDestroy {
  public first_url = "/archive";
  public base_url = "/archive";
  public picture: Picture;
  private _id: number = NaN;
  private _interval;

  constructor(
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    // enable live update
    this._interval = setInterval(() => {
      if(!isNaN(this._id) && this.picture){
        this.pictureService.getPicture(this._id).subscribe(
          picture => {
            this.picture.titles = picture.titles;
          },
          error => {
            console.log('Error while reloading titles');
          }
        )
      }
     },
     5000
    );

    // get id from route paramater and load the corresponding picture
    this.route.params.subscribe(params => {
      this._id = +params['id']
      this.pictureService.currentId = this._id
      this.pictureService.getPicture(this._id).subscribe(
      picture =>{
        this.picture = picture;
      },
      error =>{
        console.log(error);
        this.router.navigate(['/general', 'missing'])
      });
    });
  }

  ngOnDestroy(){
    if(this._interval){
      clearInterval(this._interval);
    }
  }
}
