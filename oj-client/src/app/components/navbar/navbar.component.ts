import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {
  profile:any;
  constructor( private auth: AuthService) {
    this.auth.userProfile.subscribe(
      profile => this.profile = profile
    )
  }

  ngOnInit() {
  }

  login(){
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
