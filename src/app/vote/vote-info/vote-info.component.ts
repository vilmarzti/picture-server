import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrls: ['./vote-info.component.scss']
})
export class VoteInfoComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChildren('backgroundImage') private _backgroundImages: QueryList<ElementRef>

  public isNaN = isNaN;
  public base_url: string = "/vote";
  public continue_id: number = 0;
  public starting_id: number = 0;
  public backgroundPictures: Picture[] = [];
  public backgroundImagesInit: boolean = true;
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
    let html = document.documentElement
    let body = document.body;

    let imageWidth = this._backgroundImages.first.nativeElement.width;
    let imageHeight = (imageWidth / this._imageWidth) * this._imageHeight;

    this.backgroundPictures = [];
    setTimeout(() => {
      let screenHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
      let screenWidth = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);

      let numWidth = Math.round(screenWidth / imageWidth);
      let numHeight = Math.ceil(screenHeight / imageHeight);

      let num_boxes = numWidth * numHeight;
      console.log("num_boxes" + num_boxes);

      this.backgroundPictures = [];
      for (let i = 0; i < num_boxes; i++) {
        this.backgroundPictures.push(this._pictures[i % this._pictures.length])
      }
    }, 10)
  }

  ngAfterViewChecked(): void {
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

  ngAfterViewInit(): void {
  }
}