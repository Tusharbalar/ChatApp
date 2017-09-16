import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from "../../providers/auth/auth";
import { AppProvider } from "../../providers/common";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  credentials = {
    email: "test@gmail.com",
    password: "abc123"
  } as usercreds;

  constructor(public authService: AuthProvider,
              public navCtrl: NavController,
              public angularFireAuth: AngularFireAuth,
              public appService: AppProvider,
              public navParams: NavParams) {
  }

  googleLogin() {
    this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin() {
    // this.angularFireAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    const title = "Ohh No";
    const subTitle = "This feature is under construction."
    this.appService.presentAlert(title, subTitle);
  }
 
  signin() {
    this.appService.presentLoadingDefault("Authenticating...");
    this.authService.login(this.credentials).then((res) => {
      this.appService.hideLoadingDefault();
      if (!res.code) {
        this.navCtrl.setRoot("TabsPage");
      } else {
        const title = "Login Error";
        const subTitle = res;
        this.appService.presentAlert(title, subTitle);
      }
    })
  }

  signup() {
    this.navCtrl.push("SignupPage");
  }

  passwordreset() {
    this.navCtrl.push('PasswordresetPage');
  }

}
