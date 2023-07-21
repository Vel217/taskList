import { extendObservable } from "mobx";
import Auth from "./Auth.js";
import Tasks from "./Tasks.js";

const rootStore = {
  auth: Auth,
};
extendObservable(rootStore, rootStore);
export default rootStore;
