import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})

export class BuddiesPage {

  users: any;
  tmparr: any;

  constructor(public navCtrl: NavController,
    public userService: UserProvider) {
  }

  ionViewWillEnter() {
    this.userService.getAllUsers().then((res) => {
      this.users = res;
      this.tmparr = res;
    });
  }

  searchBuddy(ev: any) {
    this.users = this.tmparr;

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.users = this.users.filter((item) => {
        return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

}
