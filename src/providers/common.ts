import { Injectable } from "@angular/core";
import { AlertController, LoadingController } from "ionic-angular";

@Injectable()
export class AppProvider {

  loading;

  constructor(private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
    
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoadingDefault(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
  
    this.loading.present();
  }

  hideLoadingDefault() {
    this.loading.dismiss();
  }

}