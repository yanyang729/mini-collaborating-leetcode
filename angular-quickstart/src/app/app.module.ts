import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import {HeroService } from './services/data.service';
import { HeroesComponent } from './heroes/heroes.component'
import {TransitionMatcherFn} from "@angular/animations/browser/src/dsl/animation_transition_expr";
import { DashboardComponent } from './dashboard/dashboard.component';
import {} from '@angular/'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule }     from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
],
  providers: [
    HeroService,
  ],
  bootstrap: [AppComponent]
})



export class AppModule { }
