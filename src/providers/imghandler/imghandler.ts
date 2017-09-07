import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Camera } from "@ionic-native/camera";

@Injectable()
export class ImageHandlerProvider {

  constructor(private camera: Camera) {
  }

  public imageUpload() {
    var promise = new Promise((resolve, reject) => {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true
      }).then((imagedata) => {
        firebase.storage().ref('/profileimages').child(firebase.auth().currentUser.uid)
          .putString(imagedata, 'base64', {contentType: 'image/png'})
          .then(savePic => {
            resolve(savePic.downloadURL);
          }).catch((err) => {
            reject(err);
          });
      });
    });
    return promise;
  }

}
