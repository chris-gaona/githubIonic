import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import { GithubUsers } from '../../providers/github-users';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  users: User[];

  // in angular 2 we inject dependencies in the constructor as parameters
  constructor(
    public navCtrl: NavController,
    private githubUsers: GithubUsers
  ) {
    githubUsers.load().subscribe(users => {
      this.users = users;
    })
  }
}
