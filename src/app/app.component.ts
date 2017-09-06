import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from "angularfire2/auth";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  @ViewChild(Nav) nav: Nav;

  constructor(private angularFireAuth: AngularFireAuth,
              private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.isLoggedIn();
    });
  }

  isLoggedIn() {
    this.angularFireAuth.authState.subscribe(res => {
      if (res && res.uid) {
        this.nav.setRoot("TabsPage");
      } else {
        this.nav.setRoot("LoginPage");
      }
    });
  }
}

