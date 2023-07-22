import { extendObservable } from "mobx";
import Auth from "./Auth.js";
import Fields from "./Fields.js";
import Notification from "./Notification.js";
import Tasks from "./Tasks.js";

const rootStore = {
  auth: Auth,
  tasks: Tasks,
  notification: Notification,
  fields: Fields,
};
extendObservable(rootStore, rootStore);
export default rootStore;
