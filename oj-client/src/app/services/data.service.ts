import { Injectable } from '@angular/core';
import { Problem } from '../data-structure/problem';
import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {
  problem: Problem[] = PROBLEMS;
  constructor() { }

  getProblems(): Problem[] {
    return this.problem;
  }
  getProblem(id: number): Problem {
    return this.problem.find((problem) => problem.id === id);
  }

  addProblem(newproblem:Problem):void {
    newproblem.id = this.problem.length + 1
    this.problem.push(newproblem)
  }
}

