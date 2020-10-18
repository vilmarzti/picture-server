import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picture } from '../shared/picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  private _currentId: number = NaN;
  private _currentIndex: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _numberOfObjects: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private _nextIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private _prevIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private _backendURL = new URL(environment.backend_url)

  constructor(private http: HttpClient) {
    this._backendURL.port = environment.backend_port.toString()
    this.getAllPictures().subscribe(
      pictures => {
        this._numberOfObjects.next(pictures.length);
      }
    )
  }
  
  get currentIndex(): Observable<number>{
    return this._currentIndex.asObservable()
  }

  get pictureLength(): Observable<number>{
    return this._numberOfObjects.asObservable();
  }

  get currentId(): number {
    return this._currentId;
  }
  set currentId(val: number) {
    this._currentId = val;
    this.computeNextPrev();
  }

  get nextId() {
    return this._nextIdSubject.asObservable();
  }

  get prevId(): Observable<number> {
    return this._prevIdSubject.asObservable();
  }

  private computeNextPrev() {
    this.getAllPictures().subscribe(
      pictures => {
        // find index of our picture
        let index = pictures.findIndex(
          pic => pic.id === this._currentId
        )

        // set new index if we got a new id
        this._currentIndex.next(index + 1);

        // set next id
        if (index === pictures.length - 1) this._nextIdSubject.next(NaN);
        else this._nextIdSubject.next(pictures[index + 1].id);

        // set prev id
        if (index <= 0) this._prevIdSubject.next(NaN);
        else this._prevIdSubject.next(pictures[index - 1].id);
      },
      err => {
        console.log(err);
      }
    )
  }

  public getPicture(id: number): Observable<Picture> {
    return this.http.get<Picture>(new URL('picture/' + id, this._backendURL).toString())
  }

  public getAllPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(new URL('pictureAll', this._backendURL).toString())
  }

  public updateVote(id: number, title: string) {
    return this.http.put(new URL('picture/' + id, this._backendURL).toString(), { title: title }, this.httpOptions);
  }
}
