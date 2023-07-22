import { observable, action } from "mobx";

const Fields = observable({
  fields: {},

  addName: action(function (name) {
    this.fields.name = name;
  }),

  addEmail: action(function (email) {
    this.fields.email = email;
  }),
  addText: action(function (text) {
    this.fields.text = text;
  }),
  addStatus: action(function (status) {
    this.fields.status = status;
  }),
});

export default Fields;
