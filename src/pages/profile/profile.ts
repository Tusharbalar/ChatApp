import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { AppProvider } from "../../providers/common";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';

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
    this.appService.presentLoadingDefault("Loading Profile Data...");
    this.userService.getUserDetails().then((res: any) => {
      this.appService.hideLoadingDefault();
      this.displayName = res.displayName;
      this.avatar = res.photoURL;
    }).catch((err) => {
      this.appService.hideLoadingDefault();
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
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

}
