import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { AppProvider } from "../../providers/common";
import { RequestsProvider } from "../../providers/requests/requests";

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})

export class RequestsPage {

  myRequests = [];

  constructor(private appService: AppProvider,
              private events: Events,
              private requestService: RequestsProvider) {
  }

  ionViewWillEnter() {
    this.requestService.getMyRequests();
    this.events.subscribe('gotrequests', () => {
      this.myRequests = [];
      this.myRequests = this.requestService.userDetails;
    });
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }

  accept(buddy) {
    this.requestService.acceptRequest(buddy).then((res) => {
      const title = "Friend Added";
      const subTitle = "Tap on the friend to chat with him";
      this.appService.presentAlert(title, subTitle);
    });
  }

  ignore(buddy) {
    console.log(buddy);
    this.requestService.deleteRequest(buddy).then((res) => {
      console.log(res)
    })
  }

  doSomething(item) {
    console.log(item)
  }

}
