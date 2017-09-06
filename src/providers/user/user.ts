import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/users');

  constructor(public angularFireAuth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.angularFireAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://avatars1.githubusercontent.com/u/4783557?v=4&s=460'
        }).then(() => {
          this.firedata.child(this.angularFireAuth.auth.currentUser.uid).set({
            uid: this.angularFireAuth.auth.currentUser.uid,
            displayName: newuser.displayName,
            photoURL: 'https://avatars1.githubusercontent.com/u/4783557?v=4&s=460'
          }).then(() => {
            resolve({ success: true });
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  passwordreset(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then((res) => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

  updateimage(imageurl) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.currentUser.updateProfile({
        displayName: this.angularFireAuth.auth.currentUser.displayName,
        photoURL: imageurl
      }).then(() => {
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.angularFireAuth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          resolve({ success: true });
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

}
