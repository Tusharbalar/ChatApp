import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { connreq } from "../../models/interfaces/usercreds";
import { UserProvider } from "../user/user";
import { Events } from "ionic-angular";

@Injectable()
export class RequestsProvider {

  firereq = firebase.database().ref('/requests');
  userDetails = [];

  constructor(private userService: UserProvider,
              private events: Events) {
  }

  sendRequest(req: connreq) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
        sender: req.sender
      }).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        resolve(err);
      });
    });
    return promise;  
  }

  getMyRequests() {
    let myRequests = [];
    let allRequests;
    this.firereq.child(firebase.auth().currentUser.uid).on("value", (snapshot) => {
      allRequests = snapshot.val();
      myRequests = [];
      // if (myRequests.length == 0) { return; }
      for (var i in allRequests) {
        myRequests.push(allRequests[i].sender);
      }
      this.userService.getAllUsers().then((users) => {
        let allUsers: any = users;
        this.userDetails = [];
        myRequests.forEach((request, index) => {
          allUsers.forEach((user, index2) => {
            if (myRequests[index] === allUsers[index2].uid) {
              this.userDetails.push(allUsers[index2]);
            }
          });
        });
        this.events.publish("gotrequests");
      });
    });
  }

  deleteRequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).orderByChild("sender").equalTo(buddy.uid).once("value", (snapshot) => {
        let somekey;
        for (var key in snapshot.val())
          somekey = key;
        this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
          resolve(true);
        }).catch((err) => {
          reject(err);
        });
      });
    });
    return promise;
  }

  acceptRequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then((res) => {
        this.firereq.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then((res) => {
          this.deleteRequest(buddy).then((res) => {
            resolve(res);
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      })
    });
    return promise;
  }

}
