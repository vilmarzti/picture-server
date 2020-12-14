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
  public first_url = "/archiv";
  public base_url = "/archiv";
  public picture: Picture;
  public recent_votes: { title: string, votes: number, date: string }[] = []
  private _id: number = NaN;
  private _interval;

  constructor(
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pictureService.random = false;

    // enable live update
    this._interval = setInterval(() => { this.updateVotes() }, 5000);

    // get id from route paramater and load the corresponding picture
    this.route.params.subscribe(params => {
      this._id = +params['id'];
      this.pictureService.currentId = this._id;
      this.updateVotes();
    });
  }

  ngOnDestroy() {
    if (this._interval) {
      clearInterval(this._interval);
    }
  }

  private updateVotes() {
    if (!isNaN(this._id)) {
      this.pictureService.getPicture(this._id).subscribe(
        picture => {
          this.picture = picture

          this.picture.titles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          this.recent_votes = this.picture.titles.slice(0, 2);

          this.picture.titles.sort((a, b) => b.votes - a.votes);


          this.picture.baseline_titles = picture.baseline_titles;
          this.picture.baseline_titles.sort((a, b) => b.votes - a.votes);

          this.picture.seq2seq_titles = picture.seq2seq_titles;
          this.picture.seq2seq_titles.sort((a, b) => b.votes - a.votes);
        },
        error => {
          console.log(error);
          console.log('Error while reloading titles');
          this.router.navigate(['/general', 'missing'])
        }
      )
    }
  }
}
