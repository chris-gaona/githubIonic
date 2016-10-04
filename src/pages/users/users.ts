import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/user';
import { GithubUsers } from '../../providers/github-users';
import {UserDetailsPage} from "../user-details/user-details";

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
  originalUsers: User[];

  // in angular 2 we inject dependencies in the constructor as parameters
  constructor(
    public navCtrl: NavController,
    private githubUsers: GithubUsers
  ) {
    githubUsers.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    });

    // githubUsers.searchUsers('scotch').subscribe(users => {
    //   console.log(users);
    // });
  }

  // We then add a method that will handle the navigation, goToDetails.
  // It takes in a login (username) as a parameter.
  goToDetails(login: string) {
    // Ionic 2 treats navigation as a stack, meaning pages are added on top of each other.
    // That is why you see the this.navCtrl.push, and we push a page into the navigation stack.
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value;
    // We will only perform the search if we have 3 or more characters
    if (term.trim() === '' || term.trim().length < 3) {
      // load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsers.searchUsers(term).subscribe(users => {
        this.users = users;
      });
    }
  }
}
