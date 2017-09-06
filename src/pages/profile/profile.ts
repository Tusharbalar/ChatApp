import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  avatar: string;
  displayName: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public zone: NgZone,
              public userService: UserProvider) {
  }

  ionViewWillEnter() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails().then((res: any) => {
      this.displayName = res.displayName;
      console.log("SSSS", res, res.displayName);
      this.avatar = res.photoURL;
    }).catch((err) => {
      console.log("err", err);
    })
  }

  editName() {
    let prompt = this.alertCtrl.create({
      title: 'Edit Nickname',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [{
        name: 'newName',
        value: this.displayName
      }],
      buttons: [{
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked', data);
          this.displayName = data.newName;
          this.userService.editNickName(data.newName).then((res: any) => {
            console.log("AAA", res);
            if (res.success) {

            } else {
              
            }
          }).catch((err) => {
            console.log("err", err);
          })
        }
      }]
    });
    prompt.present();
  }

  logout() {

  }

}
