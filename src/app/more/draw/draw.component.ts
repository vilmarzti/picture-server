import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Event, NavigationStart, Router } from '@angular/router';
import { History } from './history';
import { Stroke } from './stroke';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private model = 'baseline';
  private history: History;

  public model_list: [string, string][] = [];
  public result: [string, number][] = [];
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
    this.router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationStart) {
          let url = event.url;
          if (url.includes('baseline')) {
            this.model = "baseline";
            this.model_list[0][1] = "baseline *";
            this.model_list[1][1] = "seq2seq";
          }
          else if (url.includes('seq2seq')) {
            this.model = "seq2seq";
            this.model_list[0][1] = "baseline";
            this.model_list[1][1] = "seq2seq *";
          }
          else {
            this.router.navigate(['/more/draw'])
          }
        }
      }
    )
    // setup history for later use
    this.history = {
      wholeword_segments: '',
      word_ascii: '',
      word_stroke: [],
      num_interpretations: 5
    }

    // setup list of possible models
    this.model_list = [["baseline", "baseline *"], ["seq2seq", "seq2seq"]]
  }

  // is called whenever a new stroke is emitted
  public newStroke(stroke: Stroke) {
    this.history.word_stroke.push(stroke)
  }

  public submit() {
    let model_url = new URL(environment.backend_url);
    if (this.model === 'baseline') {
      model_url.port = environment.model.baseline.port.toString();
    }
    else {
      model_url.port = environment.model.seq2seq.port.toString();
    }
    console.log(this.history);
    this.http.post(model_url.toString(), this.history, this.httpOptions).subscribe(
      data => {
        let list: [string, number][] = []
        this.result = data['result'];
        for (let elem in data) {
          list.push([elem, data[elem]]);
        }
        list.sort((a, b) => b[1] - a[1]);
        this.result = list;
      },
      err => {
        console.log(err);
      }
    )
  }

  public clearCanvas(): void {
    // trigger directive
    this.history.word_stroke = [];
    this.result = [];
  }
}
