import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
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
  allMessages;

  @ViewChild('content') content: Content;

  constructor(public navCtrl: NavController,
              private chatService: ChatProvider,
              private events: Events,
              private zone: NgZone,
              public navParams: NavParams) {
    this.buddy = this.chatService.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allMessages = [];
      this.zone.run(() => {
        this.allMessages = this.chatService.buddyMessages;
      })
    });
  }

  ionViewDidEnter() {
    this.chatService.getBuddyMessages();
  }

  addMessage() {
    if (!this.newMessage) { return; }
    this.chatService.addNewMessage(this.newMessage).then(() => {
      this.newMessage = "";
      this.content.scrollToBottom();
    });
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
