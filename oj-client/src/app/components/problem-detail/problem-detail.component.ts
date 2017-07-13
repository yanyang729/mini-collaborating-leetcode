import {Component, Inject, OnInit} from '@angular/core';
import { Problem } from '../../data-structure/problem'
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css']
})
export class ProblemDetailComponent implements OnInit {
  problem: Problem;
  constructor(
    private route: ActivatedRoute,
    @Inject('data') private data
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.problem = this.data.getProblem(+params['id']);
    });
  }
}
