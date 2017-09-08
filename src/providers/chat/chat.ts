import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from "ionic-angular";

@Injectable()
export class ChatProvider {

  fireBuddyChats = firebase.database().ref("/buddychat");
  buddy: any;
  current_user_id = firebase.auth().currentUser.uid;
  buddyMessages = [];
  
  constructor(private events: Events) {
  }

  initBuddy(buddy) {
    this.buddy = buddy;
  }

  addNewMessage(msg) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.fireBuddyChats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.fireBuddyChats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        })
      })
      return promise;
    }
  }

  getBuddyMessages() {
    let temp;
    this.fireBuddyChats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (snapshot) => {
      this.buddyMessages = [];
      temp = snapshot.val();
      console.log("DSDSD", temp)
      for (var tempkey in temp) {
        this.buddyMessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

}
