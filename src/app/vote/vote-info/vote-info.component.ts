import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrls: ['./vote-info.component.scss']
})
export class VoteInfoComponent implements OnInit, AfterViewInit{
  @ViewChildren('backgroundImage') private _backgroundImages: QueryList<ElementRef>
  public base_url: string ="/vote";
  public continue_id: number = 0;
  public starting_id: number = 0;
  public isNaN: Function = isNaN;
  public pictures: Picture[] = [];

  constructor(
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    // use randomized start
    this.pictureService.random = true;

    // get saved id
    this.continue_id = this.pictureService.currentId;
    // get starting id
    this.pictureService.getAllPictures().subscribe(
      pictures =>{
        if(pictures.length > 0){
          this.starting_id = pictures[0].id;
          this.pictures = pictures;
        }
      },
      err =>{
        console.log(err);
      }
    )
  }

  ngAfterViewInit(): void {
    this._backgroundImages.changes.subscribe( 
      backgroungImages => {
        this.pictures.push(this.pictures[0])
        console.log(this.pictures)
      }
    )
  }
}
