import { useObserver } from "mobx-react-lite";
import { deleteTaskDB } from "../../../api/task/task.api.js";
import ErrorBlock from "../../../components/ErrorBlock.js";
import SuccessBlock from "../../../components/SuccessBlock.js";
import rootStore from "../../../stores/CombineStore.js";

function TableItem({ onClickEdit }) {
  const deleteTask = (id) => {
    deleteTaskDB(id).then((res) => {
      if (res.status === 200) {
        rootStore.taskTable.changeDeleteSuccess(true);
      } else {
        rootStore.taskTable.changeDeleteError(true);
      }
    });
  };

  return useObserver(() => (
    <>
      <tbody className="divide-y divide-gray-200">
        {rootStore.taskTable.taskTable.deleteError && (
          <ErrorBlock
            text={
              "Only an administrator can delete a task. Please login as an administrator"
            }
          />
        )}
        {rootStore.taskTable.taskTable.deleteSuccess && (
          <SuccessBlock
            text={
              "The task has been successfully delete. Refresh the page to see the new list"
            }
          />
        )}
        {rootStore.taskTable.taskTable.list.length ? (
          rootStore.taskTable.taskTable.list.map((item) => (
            <tr key={item.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                {item.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
                {item.text}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.status ? "done" : "not ready yet"}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {item.editedByAdmin ? "edited" : "not edited"}
              </td>
              {rootStore.auth.isAdmin && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-5 justify-end">
                  <div className="flex">
                    <div className="flex gap-5">
                      <button
                        onClick={() => onClickEdit(item)}
                        className="rounded-md bg-blue-500 w-16 px-2.5 py-1.5 text-sm font-semibold text-gray-50 shadow-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          deleteTask(item.id);
                        }}
                        className="rounded-md bg-red-400 w-16 px-2.5 py-1.5 text-sm font-semibold text-gray-50 shadow-md hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td>No items</td>
          </tr>
        )}
      </tbody>
    </>
  ));
}

export default TableItem;
