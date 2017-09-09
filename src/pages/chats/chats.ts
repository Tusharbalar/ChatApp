import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { AppProvider } from "../../providers/common";
import { RequestsProvider } from "../../providers/requests/requests";
import { ChatProvider } from "../../providers/chat/chat";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myRequests = [];
  myFriends = [];

  constructor(public navCtrl: NavController,
              private appService: AppProvider,
              private events: Events,
              private chatService:  ChatProvider,
              private requestService: RequestsProvider) {
  }

  ionViewWillEnter() {
    this.requestService.getMyRequests();
    this.events.subscribe('gotrequests', () => {
      this.myRequests = [];
      this.myRequests = this.requestService.userDetails;
    });
    this.requestService.getMyFriends();
    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.requestService.myFriends; 
      console.log("SASASA", this.myFriends);
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addBuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  accept(buddy) {
    this.requestService.acceptRequest(buddy).then((res) => {
      console.log("SASAS", res);
      const title = "Friend Added";
      const subTitle = "Tap on the friend to chat with him";
      this.appService.presentAlert(title, subTitle);
    });
  }

  ignore(buddy) {
    console.log(buddy);
    this.requestService.deleteRequest(buddy).then((res) => {
      console.log(res)
    })
  }

  buddyChat(buddy) {
    this.chatService.initBuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }

  doSomething(item) {
    console.log(item)
  }

}
