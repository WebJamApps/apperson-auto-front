export class AppState {
  constructor() {
    this.user = {};
    this.is_auth = false;
    this.roles = [];
  }

  getUser() {
    return this.user;
  }

  setUser(input) {
    this.user = input;
  }

  getAuth() {
    return (this.is_auth);
  }

  setAuth(input) {
    this.is_auth = input;
  }

  getRoles() {
    return (this.roles);
  }

  setRoles(input) {
    this.roles = input;
  }
}
