import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { AppProvider } from "../../providers/common";
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  avatar: string;
  displayName: string;
  isEditName = false;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public appService: AppProvider,
              public angularFireAuth: AngularFireAuth,
              public userService: UserProvider) {
  }

  ionViewWillEnter() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().then((res: any) => {
      this.displayName = res.displayName;
      this.avatar = res.photoURL;
    }).catch((err) => {
      console.log("err", err);
    })
  }

  editName() {
    let prompt = this.alertCtrl.create({
      title: 'Edit Nickname',
      inputs: [{
        name: 'newName',
        value: this.displayName
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {
        }
      }, {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked', data);
          this.displayName = data.newName;
          this.isEditName = true;
          this.userService.editNickName(data.newName).then((res: any) => {
            this.isEditName = false;
            if (!res.success) {
              this.displayName = this.angularFireAuth.auth.currentUser.displayName;
              this.appService.showToast("Nickname not update " + this.displayName);
            }
          }).catch((err) => {
            this.isEditName = false;
          });
        }
      }]
    });
    prompt.present();
  }

  editImage() {

  }

  logout() {

  }

}
