import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { AppProvider } from "../../providers/common";

@IonicPage()
@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string = "";

  constructor(public navCtrl: NavController,
              public appService: AppProvider,
              private userService: UserProvider) {
  }

  reset() {
    this.userService.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        console.log(res);
        const title = 'Email Sent';
        const subTitle = 'Please follow the instructions in the email to reset your password';
        this.appService.presentAlert(title, subTitle);
      } else {
        const title = "Password Reset Error";
        this.appService.presentAlert(title, "");
      }
    }).catch((err) => {
      const title = "Password Reset Error";
      const subTitle = err.message;
      this.appService.presentAlert(title, subTitle);
    });
  }
 
  goback() {
    this.navCtrl.setRoot('LoginPage');
  }

}
