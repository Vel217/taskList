import { useEffect } from "react";
import { sendTask } from "../../../api/task/task.api.js";
import Input from "../../../components/Input.js";
import SuccessBlock from "../../../components/SuccessBlock.js";
import rootStore from "../../../stores/CombineStore.js";
import { useObserver } from "mobx-react-lite";
import ErrorBlock from "../../../components/ErrorBlock.js";

function TaskForm() {
  const newTask = (e) => {
    console.log(
      rootStore.taskForm.taskForm.name,
      rootStore.taskForm.taskForm.email,
      rootStore.taskForm.taskForm.text,
      rootStore.taskForm.taskForm.validEmail
    );
    e.preventDefault();
    if (
      rootStore.taskForm.taskForm.name &&
      rootStore.taskForm.taskForm.email &&
      rootStore.taskForm.taskForm.text &&
      rootStore.taskForm.taskForm.validEmail
    ) {
      console.log("tralala");

      sendTask(
        rootStore.taskForm.taskForm.name,
        rootStore.taskForm.taskForm.email,
        rootStore.taskForm.taskForm.text
      ).then((res) => {
        if (res.status === 200) {
          rootStore.taskForm.successTrue();
          rootStore.taskForm.reset();
          rootStore.taskForm.successTrue();
        } else {
          rootStore.taskForm.errorTrue();
        }
      });
    }
  };

  const onChangeName = (e) => {
    rootStore.taskForm.addName(e.target.value);
  };
  const onChangeEmail = (e) => {
    rootStore.taskForm.addEmail(e.target.value);
    rootStore.taskForm.validationEmail(e.target.value);
  };

  useEffect(() => {
    if (
      rootStore.taskForm.taskForm.name ||
      rootStore.taskForm.taskForm.email ||
      rootStore.taskForm.taskForm.text
    ) {
      rootStore.taskForm.successFalse();

      rootStore.taskForm.errorFalse();
    }
  }, [
    rootStore.taskForm.taskForm.name,
    rootStore.taskForm.taskForm.email,
    rootStore.taskForm.taskForm.text,
  ]);

  return useObserver(() => (
    <form
      className="shadow-md rounded-md bg-gray-50 p-4 my-4"
      onSubmit={newTask}
    >
      <p className="text-2xl text-gray-600 mb-4"> Create new task</p>
      <div className="flex gap-5 items-center">
        <Input
          label="Name"
          value={rootStore.taskForm.taskForm.name}
          onChange={onChangeName}
          placeholder="Fill name"
          className="shadow-md"
        />

        <Input
          label="Email"
          value={rootStore.taskForm.taskForm.email}
          onChange={onChangeEmail}
          placeholder="Fill email"
        />

        {!rootStore.taskForm.taskForm.validEmail && (
          <div class="rounded-md bg-red-50 p-2 self-end shadow-sm">
            <div class="flex">
              <div class="mx-3">
                <div class="text-sm text-red-700">
                  <p>The email must be in the format: test@test.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <label
        htmlFor="text"
        className="block text-sm font-medium leading-6 text-gray-900 mt-4"
      >
        Text
      </label>
      <div className="mt-2">
        <textarea
          rows="4"
          required
          value={rootStore.taskForm.taskForm.text}
          onChange={(e) => {
            rootStore.taskForm.addText(e.target.value);
          }}
          className="resize-none  block px-4 w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          placeholder="Text of task"
        />
      </div>
      <div className="flex gap-10">
        <button
          type="submit"
          className="rounded-md mt-4 bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-gray-50 shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send new task in list
        </button>
        {rootStore.taskForm.taskForm.success && (
          <SuccessBlock
            text={
              "The task has been successfully created. Refresh the page to see the new list"
            }
          />
        )}
        {rootStore.taskForm.taskForm.error && (
          <ErrorBlock text={"Error creating task "} />
        )}
      </div>
    </form>
  ));
}

export default TaskForm;
