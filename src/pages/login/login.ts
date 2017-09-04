import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { usercreds } from '../../models/interfaces/usercreds';
import { AuthProvider } from "../../providers/auth/auth";
import { AppProvider } from "../../providers/common";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  credentials = {} as usercreds;

  constructor(public authService: AuthProvider,
              public navCtrl: NavController,
              public appService: AppProvider,
              public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 
  signin() {
    this.authService.login(this.credentials).then((res) => {
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
  }

}
