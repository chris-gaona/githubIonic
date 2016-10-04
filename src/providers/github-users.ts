import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

/*
  Generated class for the GithubUsers provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GithubUsers {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: Http) { }

  // Load all github users
  load(): Observable<User[]> {
    // make a request to the github api
    return this.http.get(`${this.githubApiUrl}/users`)
      // parse the json response with res.json()
      // cast it as an array of users with <User[]>res.json()
      // This is returned as an observable, which we'll subscribe to to see the users
      .map(res => <User[]>res.json());
  }
}
