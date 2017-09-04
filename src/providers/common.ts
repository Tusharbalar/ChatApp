import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";

@Injectable()
export class AppProvider {

  constructor(private alertCtrl: AlertController) {
    
  }

  presentAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}