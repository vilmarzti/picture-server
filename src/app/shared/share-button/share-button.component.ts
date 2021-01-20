import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {
  public current_url;
  private whatsapp_base_url = "https://api.whatsapp.com/send?text="

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.current_url = this.construWALink(this.router.url);

    this.router.events.subscribe((event: Event) => {
      if(event instanceof NavigationEnd){
        this.current_url = this.construWALink(event.url);
      }
    })
  }

  private fullURL(path: string){
    let base= new URL(environment.backend_url);
    return new URL(path, base).toString();
  }

  private toHTML(input: string){
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  private construWALink(url: string){
    return this.whatsapp_base_url + this.toHTML(this.fullURL(url));
  }

}
