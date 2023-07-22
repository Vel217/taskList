import { observable, action } from "mobx";

const TaskTable = observable({
  taskTable: {
    error: false,
    list: [],
    currentPage: 1,
    totalPages: 0,
    sortBy: "name",
    sortDirection: "asc",
    isModalOpen: false,
    currentItem: null,
    deleteSuccess: false,
    deleteError: false,
  },
  addList: action(function (list) {
    this.taskTable.list = list;
  }),
  errorTrue: action(function () {
    this.taskTable.error = true;
  }),

  errorFalse: action(function () {
    this.taskTable.error = false;
  }),
  changeCurrentPage: action(function (page) {
    this.taskTable.currentPage = page;
    console.log(this.taskTable.currentPage);
  }),

  changeTotalPage: action(function (total) {
    this.taskTable.totalPages = total;
  }),

  changeSortBy: action(function (value) {
    this.taskTable.sortBy = value;
  }),

  changeSortDirection: action(function (value) {
    this.taskTable.sortDirection = value;
  }),

  modalIsOpen: action(function (value) {
    this.taskTable.isModalOpen = value;
  }),
  changeCurrentItem: action(function (value) {
    this.taskTable.currentItem = value;
  }),
  changeDeleteSuccess: action(function (value) {
    this.taskTable.deleteSuccess = value;
  }),
  changeDeleteError: action(function (value) {
    this.taskTable.deleteError = value;
  }),

  reset: action(function () {
    this.taskTable = {
      error: false,
      list: [],
      currentPage: 1,
      totalPages: 0,
      sortBy: "name",
      sortDirection: "asc",
      isModalOpen: false,
      currentItem: null,
    };
  }),
});

export default TaskTable;
