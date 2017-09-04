import { Injectable } from "@angular/core";
import { AlertController, LoadingController, ToastController } from "ionic-angular";

@Injectable()
export class AppProvider {

  loading;

  constructor(private alertCtrl: AlertController,
              private toastCtrl: ToastController,
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

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}