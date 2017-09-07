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
            console.log("2", myRequests[index], allUsers[index2].uid)
            if (myRequests[index] === allUsers[index2].uid) {
              this.userDetails.push(allUsers[index2]);
            }
          });
        });
        this.events.publish("gotrequests");
      });
    });
  }

}
