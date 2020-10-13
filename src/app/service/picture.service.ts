import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { URL } from 'url';
import { Picture } from '../interfaces/picture';
import { httpParams } from '../parameters/general';
const urljoin = require('url-join');

@Injectable({
  providedIn: 'root'
})
export class PictureService{
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
  }

  constructor(private http: HttpClient) { 
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
