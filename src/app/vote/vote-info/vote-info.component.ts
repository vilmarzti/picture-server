import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrls: ['./vote-info.component.scss']
})
export class VoteInfoComponent implements OnInit, AfterViewInit {
  @ViewChildren('backgroundImage') private _backgroundImages: QueryList<ElementRef>

  public isNaN = isNaN;
  public base_url: string = "/vote";
  public continue_id: number = 0;
  public starting_id: number = 0;
  public backgroundPictures: Picture[] = [];
  public _backgroundImagesInit: boolean = true;
  public imageHeight;
  private _pictures: Picture[] = [];

  private _imageHeight = 597.0;
  private _imageWidth = 844.0;

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    // use randomized start
    this.pictureService.random = true;

    // get saved id
    this.continue_id = this.pictureService.currentId;

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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    // if no images are displayed abort
    if (!this._backgroundImages.first) return

    let html = document.documentElement
    let body = document.body;

    // remove all background pictures
    setTimeout(() => {this.backgroundPictures = []});

    // compute the number of imgaes needed and add them to the background
    setTimeout(() => {
      let screenHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      let screenWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

      // get the image height and width
      let imageWidth = 0;
      if (screenWidth > 1200) imageWidth = screenWidth / 10
      else imageWidth = screenWidth / 5

      let imageHeight = (imageWidth / this._imageWidth) * this._imageHeight;
      this.imageHeight = imageHeight;


      let numWidth = Math.round(screenWidth / imageWidth);
      let numHeight = Math.ceil(screenHeight / imageHeight);

      let num_boxes = numWidth * numHeight;

      let pictures = []
      for (let i = 0; i < num_boxes; i++) {
        pictures.push(this._pictures[i % this._pictures.length])
      }
      this.backgroundPictures = pictures;
    }, 10)
  }

  ngAfterViewInit(): void {
    this._backgroundImages.changes.subscribe(
      () => {
        if (this._backgroundImagesInit) {
          this._backgroundImagesInit = false;
          this.onResize(null);
        }
      }
    )
  }
}