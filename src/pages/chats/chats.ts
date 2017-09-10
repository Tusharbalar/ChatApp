import { Component } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { RequestsProvider } from "../../providers/requests/requests";
import { ChatProvider } from "../../providers/chat/chat";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})

export class ChatsPage {

  myFriends = [];

  constructor(public navCtrl: NavController,
              private events: Events,
              private chatService:  ChatProvider,
              private requestService: RequestsProvider) {
  }

  ionViewWillEnter() {
    this.requestService.getMyFriends();
    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.requestService.myFriends; 
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('friends');
  }

  addBuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  buddyChat(buddy) {
    this.chatService.initBuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }

}
