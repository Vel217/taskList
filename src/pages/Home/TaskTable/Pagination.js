import { observer } from "mobx-react-lite";
import rootStore from "../../../stores/CombineStore.js";

function Pagination({ onPageChange }) {
  const { totalPages } = rootStore.taskTable.taskTable.totalPages;
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}
    </div>
  );
}

export default observer(Pagination);
