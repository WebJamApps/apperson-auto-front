import {TopNavApp} from '../../src/top-nav-app';

class RouterStub {
  routes;
  
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  let sut;
  let mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new TopNavApp();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Web Jam LLC');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContainEqual({ route: ['welcome', 'welcome'], name: 'welcome',  moduleId: './welcome', nav: true, title: 'Welcome' });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContainEqual({ route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).toContainEqual({ route: 'child-router', name: 'child-router', moduleId: './child-router', nav: true, title: 'Child Router' });
  });
});
