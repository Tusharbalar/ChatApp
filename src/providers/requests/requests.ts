import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { connreq } from "../../models/interfaces/usercreds";

@Injectable()
export class RequestsProvider {

  firereq = firebase.database().ref('/requests');

  constructor() {
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

}
