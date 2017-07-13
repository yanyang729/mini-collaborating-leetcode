import { Component, OnInit } from '@angular/core';
import { Problem } from '../../data-structure/problem'

const PROBLEMS: Problem[] = [
  {
    id: 1,
    name: 'title',
    desc: 'body',
    difficulty: 'easy',
  },  {
    id: 2,
    name: 'title2',
    desc: 'body2',
    difficulty: 'medium',
  },
]

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {

  problems: Problem[];
  constructor() { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems(): void{
    this.problems = PROBLEMS;
  }
}
