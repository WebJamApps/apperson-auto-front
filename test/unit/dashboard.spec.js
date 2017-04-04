import {Dashboard} from '../../src/dashboard';
import {StageComponent} from 'aurelia-testing';
import {AppState} from '../../src/classes/AppState.js';
const Counter = require('assertions-counter');

class AppStateMock {
  constructor(){
    this.user = {};
    this.is_auth = false;
    this.roles = [];
  }

  getUser(){
    // this.user = {name: 'Iddris Elba', userType: 'Volunteer'};
    return this.user;
  }
  setUser(input){
    this.user = input;
  }

  getAuth(){
    return (this.is_auth);
  }

  setAuth(input){
    this.is_auth = input;
  }

  getRoles(){
    return (this.roles);
  }

  setRoles(input){
    this.roles = input;
  }
}


class HttpStub {
  fetch(fn) {
    var response = this.itemStub;
    this.__fetchCallback = fn;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }
  configure(fn) {
    this.__configureCallback = fn;
    return this.__configureReturns;
  }
}

class HttpMock {
  // this one catches the ajax and then resolves a custom json data.
  // real api calls will have more methods.
  constructor(data) {
    this.user = data || {name: 'John Fitzgerald', userType: 'Charity'};
  }
  status = 500;
  headers = {accept: 'application/json', method: '', url: ''}
  configure(fn) {
    this.__configureCallback = fn;
    return this.__configureReturns;
  }
  fetch(url, obj) {
    this.headers.url = url;
    this.headers.method = obj ? obj.method : 'GET';
    if (obj && obj.method === 'put') {
      this.user = obj.body;
    }
    this.status = 200;
    return Promise.resolve({
      Headers: this.headers,
      json: () => Promise.resolve(this.user)
    });
  }
}

class AuthServiceMock {
  // basic auth functions.
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }
  authenticate() {
    this.authenticated = true;
    return Promise.resolve('user is authenticated');
  }
  setToken(token) {
    this.token = token;
    this.authenticate();
  }
  getTokenPayload() {
    return {sub: this.token};
  }
}

class RouterMock {
  map(routes) {
    return this.routes instanceof Array ? this.routes : [this.routes];
  }
  navigate(route) {
    return route;
  }
}

describe('the Dashboard Module', () => {
  let dashboard;
  let dashboard2;

  describe('Dashboard DI', () => {
    let auth;
    let http;
    let token = 'mhioj23yr675843ho12yv9852vbbjeywouitryhrcyqo7t89vu';
    beforeEach(() => {
      auth = new AuthServiceMock();
      http = new HttpMock();
      dashboard = new Dashboard(auth, http, null, new RouterMock, new AppStateMock);
      dashboard2 = new Dashboard(auth, new HttpStub, null, new RouterMock, new AppStateMock);
      // process.env.NODE_ENV = 'development';
      auth.setToken(token);
    });

    it('should authenticate and return feedback', done =>{
      dashboard.auth.authenticate().then(data => {
        expect(data).toContain('authenticated');
      }).catch((e) => {
        expect(e).toThrow();
      });
      done();
    });

    it('should check if the user is authenticated', done => {
      expect(dashboard.auth.isAuthenticated()).toBeTruthy();
      done();
    });

    it('should fetch some json data after api call', done => {
      dashboard.httpClient.fetch('/some/data').then(data => {
        expect(data).toBeDefined(); // check if the data is defined.
      }, o => {
        // else catch the reject.
        expect(o).toBeUndefined();
      });
      done();
    });

    it('should expect change in http status after getUser call', done => {
      dashboard.getUser();
      expect(http.status).toBe(200);
      done();
    });

    //TODO: Get this to work!! process.env.NODE_ENV is not recognized
    // it('should set backend to a blank string if NODE_ENV is production', done => {
    //   http = new HttpMock({name: 'Iddris Elba', userType: 'Volunteer'});
    //   auth = new AuthServiceMock();
    //   process.env.NODE_ENV = 'production';
    //   dashboard = new Dashboard(auth, http, null, new RouterMock, new AppStateMock);
    //   expect(dashboard.backend).toBe('');
    // });

    it('should expect change in http status after Volunteer activate call', done => {
      http = new HttpMock({name: 'Iddris Elba', userType: 'Volunteer'});
      auth = new AuthServiceMock();
      dashboard = new Dashboard(auth, http, null, new RouterMock, new AppStateMock);
      auth.setToken(token);
      dashboard.activate();
      setTimeout(function() {
        expect(http.status).toBe(200);
        done();
      }, 10);
    });

    it('should expect change in http status after Developer activate call', done => {
      http = new HttpMock({name: 'John Fitzgerald', userType: 'Developer'});
      auth = new AuthServiceMock();
      dashboard = new Dashboard(auth, http, null, new RouterMock, new AppStateMock);
      auth.setToken(token);
      dashboard.activate();
      setTimeout(function() {
        expect(http.status).toBe(200);
        done();
      }, 10);
    });

    it('should confirm 200 http status after updateUser call', done => {
      http = new HttpMock({name: 'John Fitzgerald', userType: 'Developer'});
      auth = new AuthServiceMock();
      let appstate;
      appstate = new AppStateMock();
      appstate.user = {name: 'John Fitzgerald', userType: 'Developer'};
      dashboard = new Dashboard(auth, http, null, new RouterMock, appstate);
      dashboard.user = {name: 'John Fitzgerald', userType: 'Developer'};
      dashboard.getUser();
      setTimeout(function() {
        dashboard.updateUser();
        expect(http.status).toBe(200);
        done();
      }, 5);
    });

    it('tests configHttpClient', (done) => {
      const { add: ok } = new Counter(2, done);
      dashboard2.activate().then(() => {
        dashboard2.httpClient.__configureCallback(new(class {
          withBaseUrl(opts) {
            expect(opts).toBe(process.env.BackendUrl);
            ok();
            return this;
          }
          useStandardConfiguration() {
            ok();
            return this;
          }
        })());
      });
    });

    it('should confirm route by returning the currently navigated route', done => {
      expect(dashboard.router.navigate(dashboard.types[0])).toBe('Charity');
      expect(dashboard.router.navigate(dashboard.types[1])).toBe('Volunteer');
      done();
    });

    // afterEach(() => {
    //   delete process.env.NODE_ENV;
    // });
  });

  //TODO: Mock environment for being production, test it, and run activate function

  describe('Staging Dashboard', () => {
    beforeEach(() => {
      dashboard = StageComponent
      .withResources('src/dashboard')
      .inView('<dashboard></dashboard>')
      .boundTo({user: {name: 'John Fitzgerald'}});
    });
    it('staging the dashboard', done => {
      done();
    });
  });
});
