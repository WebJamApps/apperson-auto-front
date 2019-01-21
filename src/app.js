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

  closeDrawer() {
    document.getElementById('drawerContainer').style.display = 'none';
  }

  toggleMobileMenu(toggle) {
    document.getElementsByClassName('page-host')[0].style.overflow = 'auto';

    this.menuToggled = true;
    const drawer = document.getElementById('drawerContainer');
    if (toggle !== 'close') {
      drawer.style.display = 'block';
    } else {
      drawer.style.display = 'none';
    }
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
