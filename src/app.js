import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {FetchConfig, AuthService} from 'aurelia-auth';
import {HttpClient} from 'aurelia-fetch-client';

import {AppRouterConfig} from './app.router.config';
import {AppState} from './classes/AppState';

import 'isomorphic-fetch';
import 'whatwg-fetch';
@inject(Router, FetchConfig, AuthService, AppRouterConfig, HttpClient, AppState)
export class App {
  constructor(router, fetchConfig, auth, appRouterConfig, httpClient, appState) {
    this.router = router;
    this.appRouterConfig = appRouterConfig;
    this.fetchConfig = fetchConfig;
    this.auth = auth;
    this.httpClient = httpClient;
    this.appState = appState;
  }
  email='';
  password='';
  authenticated = false;
  token='';

  @bindable
  drawerWidth = '200px';

  @bindable
  fullmenu = true;

  // @bindable
  // logoWidth = '200px'

  get widescreen() {
    let iswidescreen = false;
    const currentscreenwidth = document.documentElement.clientWidth;
    /* istanbul ignore else */
    if (currentscreenwidth > 970) {
      iswidescreen = true;
      //this.logoWidth = '200px';
      //  } else {
      //  this.logoWidth = '100px';
    }
    return iswidescreen;
  }

  togglemenu() {
    if (this.fullmenu) {
      this.fullmenu = false;
      this.drawerWidth = '50px';
    } else {
      this.fullmenu = true;
      this.drawerWidth = '200px';
    }
  }
  close() {
    if (!this.widescreen) {
      let drawer = document.getElementById('drawerPanel');
      drawer.closeDrawer();
    }
  }

  logout() {
    this.auth.setToken('');
    this.authenticated = false;
    this.auth.logout('/');
  }

  clickFunc(event) {
    const drawer = document.getElementsByClassName('drawer')[0];
    const toggleIcon = document.getElementsByClassName('mobile-menu-toggle')[0];
    /* istanbul ignore else */
    if (event.target.className !== 'menu-item') {
      // document.getElementsByClassName('swipe-area')[0].style.display = 'none';
      drawer.style.display = 'none';
      $(drawer).parent().css('display', 'none');
      toggleIcon.style.display = 'block';
      document.getElementsByClassName('page-host')[0].style.overflow = 'auto';
      drawer.init = 'none';
    }
  }

  toggleMobileMenu(toggle) {
    console.log(toggle);
    document.getElementsByClassName('page-host')[0].style.overflow = 'auto';
    // if (toggle !== 'close') {
    //   document.getElementsByClassName('page-host')[0].style.overflow = 'hidden';
    //   document.getElementsByClassName('swipe-area')[0].style.width = '60px';
    //   document.getElementsByClassName('page-host')[0].addEventListener('click', this.appUtils.clickFunc);
    // }
    this.menuToggled = true;
    const drawer = document.getElementsByClassName('drawer-container')[0];
    // const toggleIcon = document.getElementsByClassName('mobile-menu-toggle')[0];
    if (drawer.style.display === 'none' && toggle !== 'close') {
      drawer.style.display = 'block';
      // $(drawer).parent().css('display', 'block');
      // toggleIcon.style.display = 'none';
    } else {
      drawer.style.display = 'none';
      // $(drawer).parent().css('display', 'none');
      // toggleIcon.style.display = 'block';
    }
    // if (toggle === 'close') {
    //   document.getElementsByClassName('page-host')[0].removeEventListener('click', this.appUtils.clickFunc);
    //   document.getElementsByClassName('swipe-area')[0].style.width = '0px';
    // }
  }

  // getTokens(){
  //   return this.auth.getTokenPayload();
  // }
  //

  activate() {
    this.appRouterConfig.configure();
    this.configHttpClient();
    if (this.auth.isAuthenticated()) {
      this.authenticated = true;
      this.appState.setAuth(true);
      this.appState.setRoles(['dashboard']);
    } else {
      this.authenticated = false;
    }
  }

  configHttpClient() {
    this.httpClient.configure(httpConfig => {
      httpConfig.withDefaults({
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json'
        }
      })
        .withInterceptor(this.auth.tokenInterceptor);
    });
  }
}
