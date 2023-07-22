import { useObserver } from "mobx-react-lite";
import rootStore from "../../../stores/CombineStore.js";

function Pagination({ onPageChange }) {
  return useObserver(() => (
    <div>
      {Array.from(
        { length: rootStore.taskTable.taskTable.totalPages },
        (_, index) => index + 1
      ).map((pageNumber) => (
        <button
          key={pageNumber}
          className="mt-3 inline-flex mr-2 items-center px-4 py-2 text-sm shadow-md font-semibold rounded-md bg-blue-500 text-gray-50 ring-1 ring-inset ring-gray-300 hover:bg-blue-400 focus:z-20 focus:outline-offset-0"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  ));
}

export default Pagination;
