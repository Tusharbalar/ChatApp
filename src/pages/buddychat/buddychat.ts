import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ChatProvider } from "../../providers/chat/chat";
import firebase from "firebase";

@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})

export class BuddychatPage {

  buddy: any;
  newMessage;
  photoURL;
  allMessages = [];

  constructor(public navCtrl: NavController,
              private chatService: ChatProvider,
              private events: Events,
              private zone: NgZone,
              public navParams: NavParams) {
    this.buddy = this.chatService.buddy;
  }

  ionViewWillEnter() {
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.chatService.getBuddyMessages();
    this.events.subscribe("newmessage", () => {
      this.allMessages = [];
      this.zone.run(() => {
        this.allMessages = this.chatService.buddyMessages;
      })
    });
  }

  addMessage() {
    this.chatService.addNewMessage(this.newMessage).then(() => {
      this.newMessage = "";
    });
  }

  getAllMessages() {

  }

}
