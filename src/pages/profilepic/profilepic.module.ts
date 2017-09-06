import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePicPage } from './profilepic';

@NgModule({
  declarations: [
    ProfilePicPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePicPage),
  ],
})
export class ProfilePicPageModule {}
