import { observable, action } from "mobx";

const SignIn = observable({
  signIn: {
    error: false,
    name: undefined,
    password: undefined,
  },
  addName: action(function (name) {
    this.signIn.name = name;
  }),

  addPassword: action(function (password) {
    this.signIn.password = password;
  }),
  errorTrue: action(function () {
    this.signIn.error = true;
  }),

  errorFalse: action(function () {
    this.signIn.error = false;
  }),
  reset: action(function () {
    this.signIn = { error: false, name: undefined, password: undefined };
  }),
});

export default SignIn;
