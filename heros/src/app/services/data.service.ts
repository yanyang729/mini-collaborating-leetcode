import { Injectable } from '@angular/core';
import { Hero } from '../app.component';
import { HEROES } from '../mock-heroes';


@Injectable()
export class DataService {

  constructor() { }
  getHeroes(): Promise<Hero[]> {
    return Promise.resolve(HEROES);
  }

  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }
}



