import { useEffect } from "react";
import { getTask } from "../../../api/task/task.api.js";

import SortButton from "./SortButton.js";
import Pagination from "./Pagination.js";
import TableItem from "./TableItem.js";
import TableHeader from "./TableHeader.js";
import { ASC, DESC } from "../../../config.js";
import { useObserver } from "mobx-react-lite";
import ModalWindow from "./ModalWindow.js";
import rootStore from "../../../stores/CombineStore.js";

function TaskTable() {
  const { error, currentPage, sortBy, sortDirection, isModalOpen } =
    rootStore.taskTable.taskTable;

  const handleOpenModal = (item) => {
    rootStore.taskTable.changeCurrentItem(item);
    rootStore.taskTable.modalIsOpen(true);
  };

  const handleCloseModal = () => {
    rootStore.taskTable.changeCurrentItem(null);
    rootStore.modal.reset();
    rootStore.taskTable.modalIsOpen(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, sortBy, sortDirection]);

  const fetchTasks = () => {
    getTask(currentPage, sortBy, sortDirection)
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        rootStore.taskTable.addList(data.tasks);
        rootStore.taskTable.changeTotalPage(data.totalPages);
        console.log(rootStore.taskTable.taskTable.list, "123");
      })
      .catch((error) => {
        rootStore.taskTable.errorTrue();
      });
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      rootStore.taskTable.changeSortDirection(
        sortDirection === ASC ? DESC : ASC
      );
    } else {
      rootStore.taskTable.changeSortBy(field);
      rootStore.taskTable.changeSortDirection(ASC);
    }
  };

  const sortByName = () => handleSort("name");
  const sortByEmail = () => handleSort("email");
  const sortByStatus = () => handleSort("status");

  const handlePageChange = (newPage) => {
    rootStore.taskTable.changeCurrentPage(newPage);
  };

  return useObserver(() => (
    <div className="border-solid border-2 border-slay-200 rounded-md p-4">
      <p className="text-xl text-slate-400"> List of tasks</p>

      <div className="mt-8 flow-root">
        <div className="flex gap-5">
          <SortButton
            text="Sort by Name"
            onClick={sortByName}
            sortDirection={sortDirection}
          />
          <SortButton
            text="Sort by Email"
            onClick={sortByEmail}
            sortDirection={sortDirection}
          />
          <SortButton
            text="Sort by Status"
            onClick={sortByStatus}
            sortDirection={sortDirection}
          />
        </div>
        <div className="-mx-4 -my-2 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle  lg:px-8">
            <table className="min-w-full divide-y divide-gray-300 ml-5">
              <TableHeader />

              {!error ? (
                <TableItem onClickEdit={handleOpenModal} />
              ) : (
                <>Error to get task list, try again</>
              )}
            </table>
            <div className="ml-5">
              <Pagination onPageChange={handlePageChange} />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <ModalWindow onClose={handleCloseModal} />}
    </div>
  ));
}

export default TaskTable;
