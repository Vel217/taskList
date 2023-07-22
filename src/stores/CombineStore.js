import { extendObservable } from "mobx";
import Auth from "./Auth.js";
import Modal from "./Modal.js";
// import Fields from "./Fields.js";
import Notification from "./Notification.js";
import SignIn from "./SignIn.js";
import TaskFormStore from "./TaskForm.js";
import TaskTable from "./TaskTable.js";

const rootStore = {
  auth: Auth,
  notification: Notification,
  signIn: SignIn,
  taskForm: TaskFormStore,
  taskTable: TaskTable,
  modal: Modal,
};
extendObservable(rootStore, rootStore);
export default rootStore;
