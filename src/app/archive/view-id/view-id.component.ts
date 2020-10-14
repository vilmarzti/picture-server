import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Picture } from 'src/app/shared/picture';
import { PictureService } from 'src/app/shared/picture.service';

@Component({
  selector: 'app-view-id',
  templateUrl: './view-id.component.html',
  styleUrls: ['./view-id.component.scss']
})
export class ViewIdComponent implements OnInit {
  public first_url = "/archive";
  public base_url = "/archive";
  public picture: Picture;

  constructor(
    private pictureService: PictureService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pictureService.currentId = +params['id']
      this.pictureService.getPicture(+params['id']).subscribe(
      picture =>{
        this.picture = picture;
        console.log(this.picture.titles);
      },
      error =>{
        console.log(error);
        this.router.navigate(['/general', 'missing'])
      });
    });
  }
}
