import Task from "../models/Task.js";

export const createTask = (task) => {
  const taskItem = Task.create(task);
  if (!taskItem) {
    throw new Error("validation error");
  }
  return taskItem;
};

export const getTasks = async (params) => {
  const { pageNumber, sortBy, sortDirection } = params;
  const pageSize = 3;
  const totalCount = await Task.count();
  const totalPages = Math.ceil(totalCount / pageSize);
  const tasks = await Task.findAll({
    order: [[sortBy, sortDirection]],
    offset: (Number(pageNumber) - 1) * pageSize,
    limit: pageSize,
  });
  if (!tasks || !totalCount) {
    throw new Error("error to try get tasks");
  }
  return { tasks, totalPages };
};

export const updateTask = async (taskFields) => {
  const { text, status, id } = taskFields;
  const task = await Task.findOne({ where: { id: id } });
  if (!task) {
    throw new Error("error to try update task");
  }
  task.text = text;
  task.status = status;
  task.editedByAdmin = true;
  await task.save();
  return { task };
};

export const deleteTask = async (taskId) => {
  const task = await Task.findOne({ where: { id: Number(taskId) } });
  if (!task) {
    throw new Error("error to try delete task");
  }
  await task.destroy();
  return;
};
