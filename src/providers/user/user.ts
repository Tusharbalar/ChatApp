import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/users');

  constructor(public angularFireAuth: AngularFireAuth) {
  }

  adduser(newuser) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
        this.angularFireAuth.auth.currentUser.updateProfile({
          displayName: newuser.displayName,
          photoURL: 'https://static1.squarespace.com/static/557d1981e4b097936a86b629/t/558cf487e4b05d368538793a/1435301000191/'
        }).then(() => {
          this.firedata.child(this.angularFireAuth.auth.currentUser.uid).set({
            uid: this.angularFireAuth.auth.currentUser.uid,
            displayName: newuser.displayName,
            emailId: newuser.email,
            photoURL: 'https://static1.squarespace.com/static/557d1981e4b097936a86b629/t/558cf487e4b05d368538793a/1435301000191/'
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

  getUserDetails() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once("value", (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  editNickName(newName) {
    var promise = new Promise((resolve, reject) => {
      this.angularFireAuth.auth.currentUser.updateProfile({
        displayName: newName,
        photoURL: this.angularFireAuth.auth.currentUser.photoURL
      }).then(() => {
        this.firedata.child(this.angularFireAuth.auth.currentUser.uid).update({
          displayName: newName,
          photoURL: this.angularFireAuth.auth.currentUser.photoURL,
          uid: this.angularFireAuth.auth.currentUser.uid
        }).then(() => {
          resolve({ success: true});
        }).catch((err) => {
          reject(err);
        });
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  getAllUsers() {
    var promise = new Promise((resolve, reject) => {
      this.firedata.orderByChild('uid').once('value', (snapshot) => {
        let userdata = snapshot.val();
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }

}
