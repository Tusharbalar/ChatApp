import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AppProvider } from "../../providers/common";
import { ImageHandlerProvider } from "../../providers/imghandler/imghandler";
import { UserProvider } from "../../providers/user/user";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profilepic.html',
})
export class ProfilePicPage {

  moveon = true;
  imgurl: string = "https://static1.squarespace.com/static/557d1981e4b097936a86b629/t/558cf487e4b05d368538793a/1435301000191/";

  constructor(private appService: AppProvider,
              private imageHandler: ImageHandlerProvider,
              private navCtrl: NavController,
              private userService: UserProvider,
              private zone: NgZone) {
  }

  chooseImage() {
    this.appService.presentLoadingDefault("Please Wait...");
    this.imageHandler.imageUpload().then((data: any) => {
      this.appService.hideLoadingDefault();
      this.zone.run(() => {
        this.imgurl = data;
        this.moveon = false;
      });
    }).catch((err) => {
      this.appService.hideLoadingDefault();
      const title = "Error";
      const subTitle = err;
      this.appService.presentAlert(title, subTitle);
    });
  }

  updateproceed() {
    this.appService.presentLoadingDefault("Image Uploading...");
    this.userService.updateimage(this.imgurl).then((res: any) => {
      this.appService.hideLoadingDefault();
      if (res.success) {
        this.navCtrl.setRoot('TabsPage');
      } else {
        const title = "Error";
        const subTitle = res;
        this.appService.presentAlert(title, subTitle);
      }
    });
  }
 
  proceed() {
    this.navCtrl.setRoot('TabsPage');
  }

}
