import { useState } from "react";
import { deleteTaskDB } from "../../../api/task/task.api.js";
import ErrorBlock from "../../../components/ErrorBlock.js";

import SuccessBlock from "../TaskForm/SuccessBlock.js";

function TableItem({ list, isAdmin, onClickEdit }) {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState({});

  const showErrorMessage = (id) => {
    setMessages((prevState) => ({ ...prevState, [id]: "error" }));
  };

  const showSuccessMessage = (id) => {
    setMessages((prevState) => ({ ...prevState, [id]: "success" }));
  };

  const deleteTask = (id) => {
    deleteTaskDB(id).then((res) => {
      if (res.status === 200) {
        showSuccessMessage(id);
      } else {
        showErrorMessage(id);
      }
    });
  };

  return (
    <>
      <tbody className="divide-y divide-gray-200">
        {list.length ? (
          list.map((item) => (
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
              {isAdmin && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex gap-5 items-center">
                  <div className="flex flex-col">
                    <div className="flex gap-5">
                      <button
                        onClick={() => onClickEdit(item)}
                        className="rounded-md bg-green-300 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          deleteTask(item.id);
                        }}
                        className="rounded-md bg-red-300 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-red-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-200"
                      >
                        Delete
                      </button>
                    </div>

                    {messages[item.id] === "error" && (
                      <ErrorBlock
                        text={"Your are not admin. You cant delete tasks"}
                      />
                    )}
                    {messages[item.id] === "success" && <SuccessBlock />}
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
  );
}

export default TableItem;
