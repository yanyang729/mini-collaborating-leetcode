import { Component, OnInit } from '@angular/core';
import {Problem} from "../../data-structure/problem";


const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  name: '',
  desc: '',
  difficulty: '',
})

@Component({
  selector: 'app-new-problem',
  templateUrl: 'new-problem.component.html',
  styleUrls: ['new-problem.component.css']
})
export class NewProblemComponent implements OnInit {
  newProblem:Problem = Object.assign(DEFAULT_PROBLEM);
  difficulties: string[] = ['easy','medium','hard','super']

  constructor() { }

  ngOnInit() {
  }

  addProblem():void{

  }
}