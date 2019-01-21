
import {AppRouterConfig} from '../../src/app.router.config';
//import {AuthorizeStep} from 'aurelia-auth';

import {RouterStub} from './commons';

describe('the app.router.config module', () => {
  let sut,
    mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new AppRouterConfig(mockedRouter);
    sut.configure();
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Apperson Automotive');
  });

  it('configures the router to use pushState', () => {
    expect(sut.router.options.pushState).toBe(true);
  });

  it('configures the router\'s root to be /', () => {
    expect(sut.router.options.root).toBe('/');
  });
});
