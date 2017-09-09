import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { ChatProvider } from "../../providers/chat/chat";
import firebase from "firebase";
import { ImageHandlerProvider } from "../../providers/imghandler/imghandler";

@IonicPage()
@Component({
  selector: 'page-buddychat',
  templateUrl: 'buddychat.html',
})

export class BuddychatPage {

  buddy: any;
  newMessage = "";
  photoURL;
  allMessages;
  imgornot;

  @ViewChild('content') content: Content;
  
  constructor(public navCtrl: NavController,
              private chatService: ChatProvider,
              private imageHandler: ImageHandlerProvider,
              private events: Events,
              private zone: NgZone,
              public navParams: NavParams) {
      this.buddy = this.chatService.buddy;
      this.photoURL = firebase.auth().currentUser.photoURL;
      this.scrollto();
      this.events.subscribe('newmessage', () => {
        this.allMessages = [];
        this.imgornot  = [];
        this.zone.run(() => {
          this.allMessages = this.chatService.buddyMessages;
          for(let key in this.allMessages) {
            if(this.allMessages[key].message.substring(0, 4) == "http") {
              this.imgornot.push(true);
            } else {
              this.imgornot.push(false);
            }
          }
          this.scrollto();
        })
      });
    }
    
  // @ViewChild('myInput') myInput: ElementRef;
  // resize() {
  //   this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  // }

  ionViewDidEnter() {
    this.chatService.getBuddyMessages();
  }

  addMessage(a) {
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

  sendPicMsg() {
    this.imageHandler.picMsgStore().then((imgurl) => {
      this.chatService.addNewMessage(imgurl).then(() => {
        this.scrollto();
        this.newMessage = '';
      })
    }).catch((err) => {
      alert(err);
    });
  }

}
