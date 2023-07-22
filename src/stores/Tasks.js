import { observable, action } from "mobx";

const Tasks = observable({
  tasks: [],
  status: undefined,

  get: action(function (list) {
    this.task = list;
  }),

  add: action(function (task) {
    this.tasks = this.tasks.push(task);
  }),

  delete: action(function (task) {
    const id = task.id;
    this.tasks = this.tasks.filter((item) => item.id !== id);
  }),
  update: action(function (task) {
    const id = task.id;
    this.tasks = this.tasks.map((item) =>
      item.id === id
        ? {
            ...item,
            text: task.text,
            status: task.status,
            editedByAdmin: task.editedByAdmin,
          }
        : item
    );
  }),
});

export default Tasks;
