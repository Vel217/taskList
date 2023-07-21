import { observable, action } from "mobx";

const Auth = observable({
  isAdmin: false,

  login: action(function () {
    this.isAdmin = true;
  }),

  logout: action(function () {
    this.isAdmin = false;
  }),
});

export default Auth;
