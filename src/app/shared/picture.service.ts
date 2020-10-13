import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '../shared/picture';
import { httpParams } from './general';
const urljoin = require('url-join');

@Injectable({
  providedIn: 'root'
})
export class PictureService{
  private index = NaN;
  private ids = [];
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
  }

  constructor(private http: HttpClient) { 
    this.loadIndexes();
  }

  private loadIndexes() {
    this.getAllPictures().subscribe(
      pictures => {
        pictures.forEach(
          (pic, idx) => {
            if(idx === 0) this.index = 0;
            this.ids.push(pic.id);
          }
        )
      },
      err => {
        console.log(err);
      }
    );
  }

  public resetId() {
    if(this.ids.length === 0) return NaN
    else {
      this.index = 0;
      return this.index;
    }
  }

  public getId() {
    return this.index; 
  }

  public getNextId(): number{
    if(this.index >= this.ids.length - 2){
      return NaN;
    }else{
      this.index += 1;
      return this.ids[this.index];
    }
  }

  public getPicture(id: number): Observable<Picture>{
    return this.http.get<Picture>(urljoin(httpParams.backend_server_url, '/picture/', id.toString()));
  }

  public getAllPictures(): Observable<Picture[]>{
    return this.http.get<Picture[]>(urljoin(httpParams.backend_server_url, 'pictureAll'))
  }

  public updateVote(id: number, title: string){
    return this.http.put(urljoin(httpParams.backend_server_url, '/picture/', id.toString()), {id: id.toString(), title: title}, this.httpOptions)
  }
}
