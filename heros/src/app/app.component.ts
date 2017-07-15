import {Component, OnInit, Inject} from '@angular/core';

export class Hero {
  id:number;
  name:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  constructor(@Inject('data') private dataService){};
  title = 'Tour of Heros';
  heroes: Hero[];
  selectedHero: Hero;
  getHeroes():void {
    this.heroes = this.dataService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit():void {
    this.getHeroes();
  }
}

