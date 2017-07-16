import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';
import { NewProblemComponent } from './components/new-problem/new-problem.component';

import { DataService } from './services/data.service';

import { routing } from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
  ],
  providers: [
    {
      provide: 'data',
      useClass: DataService,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
