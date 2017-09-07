import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { AppProvider } from "../../providers/common";
import { RequestsProvider } from "../../providers/requests/requests";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myrequests = [];

  constructor(public navCtrl: NavController,
              private appService: AppProvider,
              private events: Events,
              private requestService: RequestsProvider) {
  }

  ionViewWillEnter() {
    this.requestService.getMyRequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestService.userDetails;
    })
  }

  addBuddy() {
    this.navCtrl.push('BuddiesPage');
  }

}
