// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

declare const auth0: any;

@Injectable()
export class AuthService {
  userProfile = new BehaviorSubject<any>(undefined);

  auth0 = new auth0.WebAuth({
    clientID: '8WcyQrFQUUH9FTaUXbzWSFG9lJDmaL0g',
    domain: 'yangyang729.auth0.com',
    responseType: 'token id_token',
    audience: 'https://yangyang729.auth0.com/userinfo',
    redirectUri: 'http://35.161.214.242:3000',
    scope: 'openid profile'
  });

  constructor(public router: Router) {
    this.userProfile.next(JSON.parse(localStorage.getItem('profile')))
  }

  public getProfile(): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile.next(profile);
        localStorage.setItem('profile',JSON.stringify(profile));
      }
    });
  }

  public login(): void {
    this.auth0.authorize();
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);}

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.getProfile();
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');    // Go back to the home route
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
