import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

@inject(Router, AuthorizeStep)
export class AppRouterConfig {
  constructor(router) {
    this.router = router;
  }
  configure(config1, router) {
    let theAppRouterConfig = (config) => {
      config.title = 'Apperson Automotive';
      config.options.pushState = true;
      config.options.root = '/';
      config.addPipelineStep('authorize', AuthorizeStep);//Is the actually Authorization. Prevents users from certain sites when not authorized.
      config.map([
        //{ route: 'login', name: 'login', moduleId: './login', nav: false, title: 'Login', settings: 'fa fa-sign-in'},
        {
          route: 'auto-maintenance',
          name: 'auto-maintenance',
          moduleId: PLATFORM.moduleName('./automaintenance'),
          nav: true,
          title: 'Auto Maintenance',
          settings: 'fa fa-file-text-o'
        },
        {
          route: 'general-auto-repair',
          name: 'general-auto-repair',
          moduleId: PLATFORM.moduleName('./genautorepair'),
          nav: true,
          title: 'General Auto Repair',
          settings: 'fa fa-handshake-o'
        },
        {
          route: 'major-auto-repair',
          name: 'major-auto-repair',
          moduleId: PLATFORM.moduleName('./majautorepair'),
          nav: true,
          title: 'Major Auto Repair',
          settings: 'fa fa-star-o'
        },
        {
          route: 'contact',
          name: 'contact',
          moduleId: PLATFORM.moduleName('./contact'),
          nav: true,
          title: 'Contact',
          settings: 'fa fa-book'
        },
        {
          route: ['', 'home'],
          name: 'home',
          moduleId: PLATFORM.moduleName('./home'),
          nav: true,
          title: 'Home',
          settings: 'fa fa-home'
        }
      ]);
    };

    this.router.configure(theAppRouterConfig);
  }
}
