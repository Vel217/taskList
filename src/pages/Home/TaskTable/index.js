import { useEffect, useState, useCallback } from "react";
import { getTask } from "../../../api/task/task.api.js";

import SortButton from "./SortButton.js";
import Pagination from "./Pagination.js";
import TableItem from "./TableItem.js";
import TableHeader from "./TableHeader.js";
import { ASC, DESC } from "../../../config.js";
import { useObserver } from "mobx-react-lite";
import ModalWindow from "./ModalWindow.js";

function TaskTable({ isAdmin }) {
  const [list, setList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState();
  const [currentItem, setCurrentItem] = useState(null);

  const handleOpenModal = (item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, sortBy, sortDirection]);

  const fetchTasks = () => {
    getTask(currentPage, sortBy, sortDirection)
      .then((res) => res.json())
      .then((data) => {
        setList(data.tasks);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        setError(true);
        console.error("Ошибка при получении списка задач:", error);
      });
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === ASC ? DESC : ASC);
    } else {
      setSortBy(field);
      setSortDirection(ASC);
    }
  };

  const sortByName = () => handleSort("name");
  const sortByEmail = () => handleSort("email");
  const sortByStatus = () => handleSort("status");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
              <TableHeader isAdmin={isAdmin} />

              {!error ? (
                <TableItem
                  list={list}
                  isAdmin={isAdmin}
                  onClickEdit={handleOpenModal}
                />
              ) : (
                <>Error to get task list, try again</>
              )}
            </table>
            <div className="ml-5">
              <Pagination
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalWindow item={currentItem} onClose={handleCloseModal} />
      )}
    </div>
  ));
}

export default TaskTable;
