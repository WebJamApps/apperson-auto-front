//import {News} from '../../src/news';
import {Router} from 'aurelia-router';
import {AppRouterConfig} from '../../src/app.router.config';

// class NewsStub extends News {
//   attached() {
//     //this.title = this.router.currentInstruction.config.title;
//   }
// }

class ConfigStub extends AppRouterConfig {
  map(array1) {
    return array1;
  }
  fallbackRoute(route) {
    this.route = route;
  }
}
// currentInstruction(){
//
// }
class RouterStub extends Router {
  // currentInstruction() {
  //   return config.title = 'howdy';
  // }
  
  configure(handler) {
    // let currentInstruction;
    // let title;
    // //let config;
    // currentInstruction [
    //   {config: [title, 'howdy']}
    // ];
    // currentInstruction.config.title = 'howdy';
    handler(this);
  }
  
  getRoute() {
    return this.router.currentInstruction.config.title; //name of the route
  }
  
  map(routes) {
    this.routes = routes;
  }
  
  addPipelineStep(param1, AuthorizeStep) {
    //do nothing
  }
  
  options() {
    //do nothing
  }
}


describe('the News module', () => {
  //let news1;
  let mockedRouter;
  let sut;
  let config1;
  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new AppRouterConfig(mockedRouter);
    config1 = new ConfigStub;
    config1.map([
      { route: '', name: 'dashboard', moduleId: './dashboard-routes/dashboard', nav: false, title: 'Dashboard', auth: true},
      { route: 'volunteer', name: 'volunteer', moduleId: './dashboard-routes/volunteer-dashboard', nav: false, title: 'Volunteer', auth: true},
      { route: 'charity', name: 'charity', moduleId: './dashboard-routes/charity-dashboard', nav: false, title: 'Charity', auth: true},
      { route: 'library', name: 'library', moduleId: './dashboard-routes/store-manager-dashboard-router', nav: false, title: 'Store', auth: true}
      
    ]);
    sut.configure(config1, mockedRouter);
    //news1 = new News(mockedRouter);
  });
  
  it('will attach', () => {
    //mockedRouter.getRoute();
    //news1.attached();
    //TODO expect something useful
  });
});
