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

  public picMsgStore() {
    var promise = new Promise((resolve, reject) => {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true
      }).then((imagedata) => {
        var uuid = this.guid();
        firebase.storage().ref('/picmsgs').child(firebase.auth().currentUser.uid).child("picmsg" + uuid)
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

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

}
