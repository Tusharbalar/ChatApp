import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";
import { AppProvider } from "../../providers/common";
import { AngularFireAuth } from "angularfire2/auth";
import firebase from 'firebase';
import { ImageHandlerProvider } from "../../providers/imghandler/imghandler";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage implements OnInit {

  avatar: string;
  displayName: string;
  emailId: string;
  isEditName = false;
  showLoader: boolean;
  isEditEmail = false;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public appService: AppProvider,
              public angularFireAuth: AngularFireAuth,
              public imageHandler: ImageHandlerProvider,
              private loadingCtrl: LoadingController,
              public userService: UserProvider) {
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.showLoader = true;
    this.userService.getUserDetails().then((res: any) => {
      this.showLoader = false;
      if (res) {
        this.displayName = res.displayName;
        this.avatar = res.photoURL;
        this.emailId = res.emailId;
      } else {
        this.displayName = this.angularFireAuth.auth.currentUser.displayName;
        this.avatar = this.angularFireAuth.auth.currentUser.photoURL;
      }
    }).catch((err) => {
      this.displayName = this.angularFireAuth.auth.currentUser.displayName;
      this.avatar = this.angularFireAuth.auth.currentUser.photoURL;
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

  editEmail() {

  }

  editImage() {
    let loading = this.loadingCtrl.create({
      content: "Please Wait...",
      duration: 2000
    });
    loading.present();
    this.imageHandler.imageUpload().then((url: any) => {
      this.appService.presentLoadingDefault("Please Wait...");
      this.userService.updateimage(url).then((res: any) => {
        this.appService.hideLoadingDefault();
        this.avatar = url;
      }).catch((err) => {
        this.appService.hideLoadingDefault();
        const title = "Error";
        const subTitle = err;
        this.appService.presentAlert(title, subTitle);
        this.avatar = this.angularFireAuth.auth.currentUser.photoURL;
      });
    }).catch((err) => {
      // this.appService.hideLoadingDefault();
      const title = "Error";
      const subTitle = err;
      this.appService.presentAlert(title, subTitle);
      this.avatar = this.angularFireAuth.auth.currentUser.photoURL;
    });
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
  }

}
