import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { connreq } from "../../models/interfaces/usercreds";
import firebase from "firebase";
import { AppProvider } from "../../providers/common";
import { RequestsProvider } from "../../providers/requests/requests";

@IonicPage()
@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})

export class BuddiesPage {

  users: any;
  tmparr: any;
  newRequest = {} as connreq;

  constructor(public navCtrl: NavController,
              private appService: AppProvider,
              private requestService: RequestsProvider,
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

  sendRequest(recipient) {
    this.newRequest.sender = firebase.auth().currentUser.uid;
    this.newRequest.recipient = recipient.uid;
    if (this.newRequest.sender == this.newRequest.recipient) {
      let Title = "Ohhh No!";
      let subTitle = "You are your friend always.";
      this.appService.presentAlert(Title, subTitle);
    } else {
      let Title = "Request Sent";
      let subTitle = "Your request was sent to " + recipient.displayName;
      this.requestService.sendRequest(this.newRequest).then((res: any) => {
        if (res.success) {
          this.appService.presentAlert(Title, subTitle);
          let sentuser = this.users.indexOf(recipient);
          this.users.splice(sentuser, 1);
        }
      }).catch((err) => {
        let Title = "Error";
        let subTitle = err;
        this.appService.presentAlert(Title, subTitle);
      });
    }
  }

}
