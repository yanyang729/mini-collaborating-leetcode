import { Component,Inject, OnInit } from '@angular/core';
import {HeroService} from "../services/data.service";
import { Router } from '@angular/router';

export class Hero {
  id:number;
  name:string;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit{
  constructor( private dataService:HeroService, private route: Router){};
  title = 'Tour of Heros';
  heroes: Hero[];
  selectedHero: Hero;
  getHeroes():void {
    this.dataService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  ngOnInit():void {
    this.getHeroes();
  }

  gotoDetail(): void {
    this.route.navigate(['/detail',this.selectedHero.id])
  }
}
