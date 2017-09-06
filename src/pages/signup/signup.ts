import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { AppProvider } from "../../providers/common";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newuser = {
    email: "",
    password: "",
    displayName: ""
  }

  constructor(public navCtrl: NavController,
              private userService: UserProvider,
              private appService: AppProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  signup() {
    if (this.newuser.email == "" || this.newuser.password == "" || this.newuser.displayName == "") {
      this.appService.showToast("All fields are required dude");
    } else if (this.newuser.password.length < 6) {
      this.appService.showToast("Password is not strong. Try giving more than five characters");
    } else {
      this.appService.presentLoadingDefault("Please wait...");
      this.userService.adduser(this.newuser).then((res: any) => {
        this.appService.hideLoadingDefault();
        if (res.success) {
          this.navCtrl.push("ProfilePicPage");
        } else {
          const title = "Login Error";
          const subTitle = res;
          this.appService.presentAlert(title, subTitle);
        }
      });
    }
  }

  goback() {
    this.navCtrl.pop();
  }

}
