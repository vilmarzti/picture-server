import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {
  @Output() videoLinkClicked = new EventEmitter<void>();

  public _backend_url = new URL(environment.backend_url);
  public interview_url;
  public bachelorthesis_url;

  constructor() { }

  ngOnInit(): void {
    this._backend_url.port = environment.backend_port.toString();
    this.interview_url = new URL("/image/video/interview.mp4", this._backend_url)
    this.bachelorthesis_url = new URL("/image/pdf/bachelorarbeit.pdf", this._backend_url);
  }

  toggleVideoByClick(): void{
    this.videoLinkClicked.emit();
  }

}
