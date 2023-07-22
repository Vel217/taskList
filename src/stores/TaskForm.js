import { observable, action } from "mobx";
import { emailRegex } from "../components/regExp.js";

const TaskFormStore = observable({
  taskForm: {
    error: false,
    success: false,
    name: undefined,
    email: undefined,
    text: undefined,
    validEmail: true,
  },
  addName: action(function (name) {
    this.taskForm.name = name;
  }),
  addEmail: action(function (email) {
    this.taskForm.email = email;
  }),
  addText: action(function (text) {
    this.taskForm.text = text;
  }),
  errorTrue: action(function () {
    this.taskForm.error = true;
  }),

  errorFalse: action(function () {
    this.taskForm.error = false;
  }),
  successTrue: action(function () {
    this.taskForm.success = true;
  }),

  successFalse: action(function () {
    this.taskForm.success = false;
  }),

  validationEmail: action(function (email) {
    this.taskForm.validEmail = emailRegex.test(email);
  }),

  reset: action(function () {
    this.taskForm = {
      error: false,
      success: false,
      name: undefined,
      email: undefined,
      text: undefined,
      validEmail: true,
    };
  }),
});

export default TaskFormStore;
