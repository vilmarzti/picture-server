import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Picture } from '../interfaces/picture';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      console.log(params['id']);
      this.http.get<Picture>('http://localhost:8000/picture/' + params['id'])
        .subscribe((data: Picture) => {
          console.log(data);
      })
    })
  }

}
