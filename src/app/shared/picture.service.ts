import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picture } from '../shared/picture';

@Injectable({
  providedIn: 'root'
})
export class PictureService{
  private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
  }

  private _nextIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private _prevIdSubject: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private _backendURL = new URL(environment.backend_url)

  constructor(private http: HttpClient) { 
    this._backendURL.port = environment.backend_port.toString()
  }

  private _currentId: number = -1;
  get currentId(): number{
    return this._currentId;
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
    //return this.http.get<Picture>(urljoin(this._backendURL.toString(), '/picture/', id.toString()));
    //return this.http.get<Picture>((new URL('picture/' + id.toString(), this._backendURL).toString())
    return this.http.get<Picture>(new URL('picture/' + id, this._backendURL).toString())

  }

  public getAllPictures(): Observable<Picture[]>{
    return this.http.get<Picture[]>(new URL('pictureAll', this._backendURL).toString())
  }

  public updateVote(id: number, title: string){
    return this.http.put(new URL('picutre/' + id, this._backendURL).toString(), {id: id.toString(), ttitle: title}, this.httpOptions);
  }
}
