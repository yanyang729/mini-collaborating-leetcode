import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


import { Problem } from '../data-structure/problem';
import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {
  // problem: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private http: Http) { }

  // getProblems(): Observable<Problem[]> {
  //   // return this.problem;
  //   this.http.get('/api/v1/problems').toPromise().then((res:Response) => this._problemSource.next(res.json()))
  //     .catch(this.handleError)
  //   return this._problemSource.asObservable();
  // }

  getProblems(): Observable<Problem[]> {
    // return this.problems;
    this.http.get('api/v1/problems')
      .toPromise()
      .then((res: Response) => {
        this._problemSource.next(res.json());
      })
      .catch(this.handleError);
    return this._problemSource.asObservable();
  }


  getProblem(id: number) {
    // return this.problem.find((problem) => problem.id === id);
    return this.http.get(`/api/v1/problems/${id}`).toPromise()
      .then((res:Response) => {
        // this.getProblems();
        return res.json;
      }).catch(this.handleError)
  }

  addProblem(newproblem:Problem){
    // newproblem.id = this.problem.length + 1
    // this.problem.push(newproblem)
    const headers = new Headers({'content-type':'application/json'});
    return this.http.post('/api/v1/problems',newproblem,headers).toPromise()
      .then((res:Response) => {
        this.getProblems();
        return res.json();
      }).catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error);
  }
}

