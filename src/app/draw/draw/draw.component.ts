import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { History } from '../history';
import { Stroke } from '../stroke';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit{
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private model = 'baseline';
  private history: History;
  
  public model_list = [];
  public result = '';
  public clear = 0;
 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // set the name of the used model
    this.route.params.subscribe(
      params =>{
        let url = params['name'];
        if(url === 'baseline' || url === 'seq2seq'){
          this.model = params['name'];
        }else{
          this.router.navigate(['/draw']);
        }
      }
    )

    // setup history for later use
    this.history = {
      wholeword_segments: '',
      word_ascii: '',
      word_stroke: []
    }

    // setup list of possible models
    this.model_list = Object.keys(environment.model)
 }

  // is called whenever a new stroke is emitted
  public newStroke(stroke: Stroke){
    this.history.word_stroke.push(stroke)
  }
  
  public submit(){
    let model_url = new URL(environment.backend_url);
    if(this.model === 'baseline'){
      model_url.port = environment.model.baseline.port.toString();
    }
    else{
      model_url.port = environment.model.seq2seq.port.toString();
    }
    console.log(this.history);
    this.http.post(model_url.toString(), this.history, this.httpOptions).subscribe(
      data =>{
        this.result = data['result'];
      },
      err => {
        console.log(err);
      }
    )
  }

  public clearCanvas(): void{
    // trigger directive
    this.clear += 1; 
    this.history.word_stroke = [];
    this.result = "";
  }
}
