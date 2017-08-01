import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'

import { Problem } from '../data-structure/problem';
import { Result } from '../data-structure/result'

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private http: Http) { }

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
    // return this.problems.find( (problem) => problem.id === id);
    return this.http.get(`api/v1/problems/${id}`)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();
        return res.json();
      })
      .catch(this.handleError);
  }

  addProblem(problem: Problem) {
    // problem.id = this.problems.length + 1;
    // this.problems.push(problem);
    const headers:Headers = new Headers({'content-type': 'application/json'});
    const options: RequestOptions = new RequestOptions({headers:headers})
    if (!problem.name){
      problem.name = 'No name given'
    };
    if (!problem.desc){
      problem.desc = 'No description given'
    };
    if (!problem.difficulty){
      problem.difficulty = 'easy'
    };
    return this.http.post('/api/v1/problems', problem, options)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();
        return res.json();
      })
      .catch(this.handleError)
  }

  // buildAndRun(data:any):Promise<Result>{
  //   const headers = new Headers({'content-type':'application/json'});
  //   const options: RequestOptions = new RequestOptions({headers:headers})
  //   return this.http.post('/api/v1/build_and_run',data,options).toPromise().then( res => res.json())
  // }

  buildAndRun(data:any):Observable<Result>{
    const headers = new Headers({'content-type':'application/json'});
    const options: RequestOptions = new RequestOptions({headers:headers})
    return this.http.post('/api/v1/build_and_run',data,options).map( res => res.json())
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error);
  }
}

