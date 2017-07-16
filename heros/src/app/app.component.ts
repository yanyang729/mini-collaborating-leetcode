import {Component, OnInit, Inject} from '@angular/core';

export class Hero {
  id:number;
  name:string;
}

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <ul class="nav nav-tabs">
      <li role="presentation" ><a routerLink="dashboard">Dashboard</a></li>
      <li role="presentation" ><a routerLink="/heroes">Heroes</a></li>
    </ul>
    
    
    <div class="container">
     <router-outlet></router-outlet>
    </div> 
  `,
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  constructor(){};
  title = 'Tour of Heros';

}

