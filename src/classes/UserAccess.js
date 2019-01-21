import {inject} from 'aurelia-framework';
import {AppState} from './AppState';

@inject(AppState)
export class UserAccess {
  constructor(appState) {
    this.appState = appState;
  }

  run(routingContext, next) {
    const currentUser = this.appState.getUser();
    if (routingContext.config.auth && routingContext.fragment === '/dashboard' && this.appState.getAuth()) {
      return next();
    }
    // if we need to authenticate / authorize, verify the logged in users roles here.
    if (routingContext.config.auth && this.appState.getRoles().length > 0) {
      const tempRoles = this.appState.getRoles();
      for (let i = 0; i < tempRoles.length; i++) {
        // in this case the user is only in one role at a time.
        if (routingContext.params.childRoute === tempRoles[i].toLowerCase()) {
          return next();
        }
      }

      //log.warning('not authorized');
      return next.cancel();
    } else if (routingContext.config.auth) {
      return next.cancel();
    }
    routingContext.getAllInstructions();
    return next();
  }
}
