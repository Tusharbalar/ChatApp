import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { usercreds } from "../../models/interfaces/usercreds";

@Injectable()
export class AuthProvider {

  constructor(public angularFireAuth: AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials: usercreds) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then((res) => {
      return res;
    }).catch((err) => {
      return err;
    })
  }

}
