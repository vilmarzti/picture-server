import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
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
  public clear_canvas = 0;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    reportProgress: true,
    observe: "events" as const
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
      model_url = new URL("/baseline", environment.backend_url)
    }
    else {
      model_url = new URL("/seq2seq", environment.backend_url)
    }


    this.http.post(model_url.toString(), this.history, this.httpOptions).subscribe(
      (event) => {
        if (event.type === HttpEventType.Sent) {
          document.body.style.cursor = "wait";
        }

        if (event.type === HttpEventType.Response) {
          let data = event.body;

          let list: [string, number][] = []
          for (let elem in data) {
            list.push([elem, data[elem]]);
          }

          list.sort((a, b) => b[1] - a[1]);
          this.result = list;

          document.body.style.cursor = "default";
        }
      },
      err => {
        document.body.style.cursor = "default";
        console.log(err);
      }
    )
  }

  public clearCanvas(): void {
    // trigger directive
    this.history.word_stroke = [];
    this.result = [];
    this.clear_canvas += 1;
  }
}
