import { useEffect, useState } from "react";
import { sendTask } from "../../../api/task/task.api.js";
import Input from "../../../components/Input.js";
import SuccessBlock from "../../../components/SuccessBlock.js";
import rootStore from "../../../stores/CombineStore.js";
import { useObserver } from "mobx-react-lite";

import { emailRegex } from "../../../components/regExp.js";
import ErrorBlock from "../../../components/ErrorBlock.js";

function TaskForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [successfulSending, setSuccessfulSending] = useState(false);
  const [error, setError] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const newTask = (e) => {
    e.preventDefault();
    if (name && email && text && isValidEmail) {
      sendTask(name, email, text).then((res) => {
        if (res.status === 200) {
          setSuccessfulSending(true);
          setName("");
          setEmail("");
          setText("");
        } else {
          setError(true);
        }
      });
    }
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(emailRegex.test(value));
  };

  useEffect(() => {
    if (name || email || text) {
      setSuccessfulSending(false);
      setError(false);
    }
  }, [name, email, text]);

  return useObserver(() => (
    <form
      className="border-solid border-2 border-slay-200 rounded-md p-4 my-6"
      onSubmit={newTask}
    >
      <p className="text-xl text-slate-400"> Create new task</p>
      <div className=" flex gap-5 items-center">
        <Input
          label="Name"
          value={name}
          onChange={onChangeName}
          placeholder="Fill name"
        />

        <Input
          label="Email"
          value={email}
          onChange={onChangeEmail}
          placeholder="Fill email"
        />
        {isValidEmail ? null : (
          <div class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="flex-shrink-0"></div>
              <div class="ml-3">
                <div class="mt-2 text-sm text-red-700">
                  <p>The email must be in the format: test@test.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <label
        htmlFor="text"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Text
      </label>
      <div className="mt-2">
        <textarea
          rows="4"
          required
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="resize-none  block px-4 w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          placeholder="Text of task"
        />
      </div>
      <div className="flex gap-10">
        <button
          type="submit"
          className="rounded-md mt-4 bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Send new task in list
        </button>
        {successfulSending && (
          <SuccessBlock
            text={
              "The task has been successfully created. Refresh the page to see the new list"
            }
          />
        )}
        {error && <ErrorBlock text={"Error creating task "} />}
      </div>
    </form>
  ));
}

export default TaskForm;
