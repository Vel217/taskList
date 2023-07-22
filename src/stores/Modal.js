import { observable, action } from "mobx";

const Modal = observable({
  modal: {
    error: false,
    text: null,
    status: false,
    name: null,
    email: null,
    errorAdmin: false,
    success: false,
  },

  changeErrorStatus: action(function (value) {
    this.modal.error = value;
  }),
  changeErrorAdminStatus: action(function (value) {
    this.modal.errorAdmin = value;
  }),
  changeSuccessStatus: action(function (value) {
    this.modal.success = value;
  }),

  changeText: action(function (value) {
    this.modal.text = value;
  }),

  changeStatus: action(function (value) {
    this.modal.status = value;
  }),

  changeName: action(function (value) {
    this.modal.name = value;
  }),

  changeEmail: action(function (value) {
    this.modal.email = value;
  }),

  reset: action(function () {
    this.modal = {
      error: false,
      text: null,
      status: false,
      name: null,
      email: null,
      errorAdmin: false,
      success: false,
    };
  }),
});

export default Modal;
