import { Component } from '@angular/core';
import { Plugins, SplashScreen, StatusBarStyle } from '@capacitor/core';

import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const {SplashScreen, StatusBar} = Plugins;
    try {
      await SplashScreen.show();
      await StatusBar.setStyle({style: StatusBarStyle.Light});
      if(this.platform.is('android')) {
        StatusBar.setBackgroundColor({color: '#CDCDCD'});
      }
    } catch (error) {
      console.log('This is normal in a web browser', error);
    }
  }
}
