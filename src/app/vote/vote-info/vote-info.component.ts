import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrls: ['./vote-info.component.scss']
})
export class VoteInfoComponent implements OnInit, AfterViewInit {

  @ViewChildren('backgroundImage') private _backgroundImages: QueryList<ElementRef>

  public base_url: string = "/vote";
  public backgroundImagesInit: boolean = true;
  public continue_id: number = 0;
  public starting_id: number = 0;
  public isNaN: Function = isNaN;
  public backgroundPictures: Picture[] = [];
  private _pictures: Picture[] = [];

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    // use randomized start
    this.pictureService.random = true;

    // get saved id
    this.continue_id = this.pictureService.currentId;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    let html = document.documentElement
    let body = document.body;


    let screen_height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let screen_width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

    let box_height = this._backgroundImages.first.nativeElement.height;
    let box_width = this._backgroundImages.first.nativeElement.width;
    console.log(box_height);
    console.log(box_width);

    let num_boxes = Math.ceil((screen_height * screen_width) / (box_height * box_width));
    console.log(num_boxes);

    /*for (let i = 0; i < num_boxes; i++) {
      this.backgroundPictures.push(this._pictures[i % this._pictures.length])
    }
    */
  }

  ngAfterViewInit(): void {
    // get starting id and load pictures for background
    this.pictureService.getAllPictures().subscribe(
      pictures => {
        if (pictures.length > 0) {
          this.starting_id = pictures[0].id;
          this._pictures = pictures;
          this.backgroundPictures = pictures;
        }
      },
      err => {
        console.log(err);
      }
    )

    this._backgroundImages.changes.subscribe(
      () => {
        if (this.backgroundImagesInit) {
          this.onResize(null);
        }
        else {
          this.backgroundImagesInit = false;
        }
      }
    )
  }
}