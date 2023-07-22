import { useObserver } from "mobx-react-lite";
import rootStore from "../../../stores/CombineStore.js";

function TableHeader() {
  return useObserver(() => (
    <thead>
      <tr>
        <th
          scope="col"
          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
        >
          Name
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Email
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Text
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Status
        </th>
        <th
          scope="col"
          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        >
          Edited by admin
        </th>
        {rootStore.auth.isAdmin && (
          <th
            scope="col"
            className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
          >
            Actions
          </th>
        )}
      </tr>
    </thead>
  ));
}

export default TableHeader;
