import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {

  constructor(public navCtrl: NavController,
              public userService: UserProvider) {
  }

  ionViewWillEnter() {
    this.userService.getAllUsers().then((res) => {
      console.log(res);
    });
  }

}