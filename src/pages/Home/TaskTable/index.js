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
    console.log("effect before");
    fetchTasks();
    console.log("effect after");
  }, [
    rootStore.taskTable.taskTable.sortBy,
    rootStore.taskTable.taskTable.sortDirection,
  ]);

  const fetchTasks = () => {
    console.log("get");
    getTask(
      rootStore.taskTable.taskTable.currentPage,
      rootStore.taskTable.taskTable.sortBy,
      rootStore.taskTable.taskTable.sortDirection
    )
      .then((res) => res.json())
      .then((data) => {
        rootStore.taskTable.addList(data.tasks);
        rootStore.taskTable.changeTotalPage(data.totalPages);
      })
      .catch((error) => {
        rootStore.taskTable.errorTrue();
      });
  };

  const handleSort = (field) => {
    if (field === rootStore.taskTable.taskTable.sortBy) {
      rootStore.taskTable.changeSortDirection(
        rootStore.taskTable.taskTable.sortDirection === ASC ? DESC : ASC
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
    fetchTasks();
  };

  return useObserver(() => (
    <div className="shadow-md rounded-md bg-gray-50 p-4 my-4 px-10">
      <p className="text-2xl text-gray-600 mb-4"> List of tasks</p>

      <div className="mt-8 flow-root">
        <div className="flex gap-5">
          <SortButton
            text="Sort by Name"
            onClick={sortByName}
            sortDirection={rootStore.taskTable.taskTable.sortDirection}
          />
          <SortButton
            text="Sort by Email"
            onClick={sortByEmail}
            sortDirection={rootStore.taskTable.taskTable.sortDirection}
          />
          <SortButton
            text="Sort by Status"
            onClick={sortByStatus}
            sortDirection={rootStore.taskTable.taskTable.sortDirection}
          />
        </div>
        <div className=" overflow-x-auto -mx-12">
          <div className="inline-block min-w-full py-2 align-middle  lg:px-8">
            <table className="w-full divide-y divide-gray-200 mx-5">
              <TableHeader />

              {!rootStore.taskTable.taskTable.error ? (
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

      {rootStore.taskTable.taskTable.isModalOpen && (
        <ModalWindow onClose={handleCloseModal} />
      )}
    </div>
  ));
}

export default TaskTable;
