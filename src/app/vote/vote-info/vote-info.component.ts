import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrls: ['./vote-info.component.scss']
})
export class VoteInfoComponent implements OnInit {
  public base_url ="/vote"
  constructor() { }

  ngOnInit(): void {
  }

}
