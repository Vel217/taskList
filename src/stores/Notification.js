import { observable, action } from "mobx";

const Notification = observable({
  notification: { error: false, success: false },

  errorTrue: action(function () {
    this.notification.error = true;
  }),

  errorFalse: action(function () {
    this.notification.error = false;
  }),
  successTrue: action(function () {
    this.notification.success = true;
  }),

  successFalse: action(function () {
    this.notification.success = false;
  }),
});

export default Notification;
