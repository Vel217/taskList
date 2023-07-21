import { useLocalStore } from "mobx-react-lite";

const Tasks = () => {
  const store = useLocalStore(() => ({
    taskList: [],

    create(task) {
      this.taskList.push(task);
    },

    delete() {},
  }));
  return store;
};

export default Tasks;
