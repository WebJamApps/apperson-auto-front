
const Counter = require('assertions-counter');
import {App} from '../../src/app';
import {AppState} from '../../src/classes/AppState.js';

class AuthStub {
  setToken(token) {
    this.token = token;
  }
  logout(data) {
    const response = 'user logged out';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getMe() {
    const response = 'This is user data';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getTokenPayload() {
    const response = this.token;
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  isAuthenticated() {
    this.authenticated = true;
    return this.authenticated;
  }
}

class AuthStub2 {
  setToken(token) {
    this.token = token;
  }
  logout(data) {
    //Logout
    const response = 'user logged out';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getMe() {
    const response = 'This is user data';
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  getTokenPayload() {
    const response = this.token;
    return new Promise((resolve)=>{
      resolve({json: ()=>response});
    });
  }
  isAuthenticated() {
    this.authenticated = false;
    return this.authenticated;
  }
}

class RouterStub {
  configure() {
  }
}

class HttpStub {
  configure(fn) {
    this.__configureCallback = fn;
    return this.__configureReturns;
  }
  fetch(fn) {
    this.__fetchCallback = fn;
    return Promise.resolve(this.__fetchResolves);
  }
}

describe('the App module', () => {
  let app1;
  let app2;
  beforeEach(() => {
    app1 = new App(null, null, new AuthStub, new RouterStub, new HttpStub, new AppState);
    app1.auth.setToken('No token');
    app2 = new App(null, null, new AuthStub2, new RouterStub, new HttpStub, new AppState);
  });
  // it('should set user id as undefined from getUser function when not authenticated', ()=> {
  //   app2.getUser();
  //   expect(app2.uid).toBe(undefined);
  // });
  
  it('tests configHttpClient', (done) => {
    const { add: ok } = new Counter(2, done);
    app1.auth.tokenInterceptor = 'tokenInterceptor';
    app1.configHttpClient();
    app1.httpClient.__configureCallback(new(class {
      withDefaults(opts) {
        expect(opts.mode).toBe('cors');
        ok();
        return this;
      }
      withInterceptor(token) {
        expect(token).toBe(app1.auth.tokenInterceptor);
        ok();
        return this;
      }
    })());
  });
  
  it('tests logout', () => {
    //console.log(app1);
    app1.activate();
    app1.logout();
    expect(app1.authenticated).toBe(false);
  });
  
  it('should get widescreen', () => {
    //console.log(app1);
    const app3 = new App(null, null, new AuthStub, new RouterStub, new HttpStub, new AppState);
    expect(app3.widescreen).toBe(true);
  });
  
  it('should toggle menu to be icons only', () => {
    app2.activate();
    app2.fullmenu = true;
    //console.log(app1);
    app2.togglemenu();
    expect(app2.fullmenu).toBe(false);
    expect(app2.drawerWidth).toBe('50px');
  });
  
  it('should toggle menu to be icons with text', () => {
    app1.fullmenu = false;
    //console.log(app1);
    app1.togglemenu();
    expect(app1.fullmenu).toBe(true);
    expect(app1.drawerWidth).toBe('175px');
  });
});
