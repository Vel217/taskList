import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import React from "react";

import { updateTaskDB } from "../../../api/task/task.api.js";
import SuccessBlock from "../../../components/SuccessBlock.js";
import ErrorBlock from "../../../components/ErrorBlock.js";
import rootStore from "../../../stores/CombineStore.js";
import { useObserver } from "mobx-react-lite";

function ModalWindow({ onClose }) {
  const cancelButtonRef = useRef(null);
  useEffect(() => {
    rootStore.modal.changeText(rootStore.taskTable.taskTable.currentItem.text);
    rootStore.modal.changeStatus(
      rootStore.taskTable.taskTable.currentItem.status
    );
    rootStore.modal.changeName(rootStore.taskTable.taskTable.currentItem.name);
    rootStore.modal.changeEmail(
      rootStore.taskTable.taskTable.currentItem.email
    );
  }, []);

  const onChangeText = (e) => {
    rootStore.modal.changeText(e.target.value);
  };
  const onChangeCheck = (e) => {
    console.log(rootStore.modal.modal.status);
    rootStore.modal.changeStatus(!rootStore.modal.modal.status);
  };

  const updateTaskAdmin = () => {
    const userId = localStorage.getItem("user");

    updateTaskDB(
      rootStore.modal.modal.text,
      rootStore.modal.modal.status,
      rootStore.taskTable.taskTable.currentItem.id,
      userId
    ).then((res) => {
      if (res.status === 200) {
        rootStore.modal.changeSuccessStatus(true);
      } else if (res.status === 403) {
        rootStore.modal.changeErrorAdminStatus(true);
      } else {
        rootStore.modal.changeErrorStatus(true);
      }
    });
  };
  useEffect(() => {
    rootStore.modal.changeErrorAdminStatus(false);
    rootStore.modal.changeErrorStatus(false);
  }, [rootStore.modal.modal.text, rootStore.modal.modal.status]);

  return useObserver(() => (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {rootStore.modal.modal.success && (
              <SuccessBlock
                text={
                  "The task has been successfully updated. Refresh the page to see the new list"
                }
              />
            )}
            {rootStore.modal.modal.errorAdmin && (
              <ErrorBlock
                text={
                  "You are not admin and can`t edit task. You need to login."
                }
              />
            )}
            {rootStore.modal.modal.error && (
              <ErrorBlock text={"false in try to update task. try again"} />
            )}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg ring-4 ring-blue-400 bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3">
                    <div className="text-xl mb-10 text-center">EDIT TASK</div>
                    <div className="flex items-center gap-2 mb-3 ">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                      </label>

                      <p className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        {rootStore.modal.modal.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>

                      <p className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 bg-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        {rootStore.modal.modal.email}
                      </p>
                    </div>
                    <div className="flex items-start gap-5 mt-10">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Text
                      </label>
                      <textarea
                        rows="4"
                        required
                        value={rootStore.modal.modal.text}
                        onChange={(e) => onChangeText(e)}
                        className="resize-none  block px-4 w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        placeholder="text of task"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-5">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Status
                      </label>
                      <div className="mt-2">
                        <input
                          checked={rootStore.modal.modal.status}
                          onChange={onChangeCheck}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex gap-5">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={updateTaskAdmin}
                    ref={cancelButtonRef}
                  >
                    Update
                  </button>

                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-300"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  ));
}

export default ModalWindow;
