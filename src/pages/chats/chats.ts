import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, Events } from 'ionic-angular';
import { RequestsProvider } from "../../providers/requests/requests";
import { ChatProvider } from "../../providers/chat/chat";

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})

export class ChatsPage implements OnInit {

  myFriends = [];
  showLoader: boolean;

  constructor(public navCtrl: NavController,
              private events: Events,
              private chatService:  ChatProvider,
              private requestService: RequestsProvider) {
  }

  ngOnInit() {
    this.getFridens();
  }

  ionViewDidLeave() {
    this.events.unsubscribe('friends');
  }

  getFridens() {
    this.showLoader = true;
    this.requestService.getMyFriends();
    this.events.subscribe('friends', () => {
      this.myFriends = [];
      this.myFriends = this.requestService.myFriends; 
      this.showLoader = false;
    });
  }

  addBuddy() {
    this.navCtrl.push('BuddiesPage');
  }

  buddyChat(buddy) {
    this.chatService.initBuddy(buddy);
    this.navCtrl.push('BuddychatPage');
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.requestService.getMyFriends();
      this.events.subscribe('friends', () => {
        this.myFriends = [];
        this.myFriends = this.requestService.myFriends; 
        refresher.complete();
      });
    }, 500);
  }

}
