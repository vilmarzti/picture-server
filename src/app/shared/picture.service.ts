import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Picture } from '../shared/picture';
import { httpParams } from './general';
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

  private _nextIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private _prevIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  private _currentId: number = -1;
  get currentId(): number{
    return this.currentId;
  }
  set currentId(val: number){
    this._currentId = val;
    this.computeNextPrev();
  }

  get nextId(){
    return this._nextIdSubject.asObservable();
  }

  get prevId(): Observable<number>{
    return this._prevIdSubject.asObservable();
  }

  private computeNextPrev(){
    this.getAllPictures().subscribe(
      pictures => {
        // find index of our picture
        let index = pictures.findIndex(
          pic => pic.id === this._currentId
        )
        // set next id
        if (index === pictures.length -1) this._nextIdSubject.next(NaN);
        else this._nextIdSubject.next(pictures[index + 1].id);

        // set prev id
        if (index <= 0) this._prevIdSubject.next(NaN);
        else this._prevIdSubject.next(pictures[index -1].id);
      },
      err =>{
        console.log(err);
      }
    )
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
