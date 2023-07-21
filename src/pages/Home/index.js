import { useObserver } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "../../config.js";
import TaskForm from "./TaskForm/index.js";
import TaskTable from "./TaskTable/index.js";
import rootStore from "../../stores/CombineStore.js";
import { authGet, logOut } from "../../api/login/login.api.js";
import ErrorBlock from "./TaskForm/ErrorBlock.js";

function App() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("session"));
  const [error, setError] = useState(false);

  const login = () => {
    navigate(LOGIN_PATH);
  };
  useEffect(() => {
    const authId = localStorage.getItem("user");

    authGet(authId).then((res) => {
      if (res.status === 200) {
        setError(false);
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });
  }, [isAdmin]);
  const logout = useCallback(() => {
    const userId = localStorage.getItem("user");
    logOut(userId).then((res) => {
      if (res.status === 200) {
      }
      localStorage.removeItem("session");
      localStorage.setItem("session", false);
      setIsAdmin(false);
    });
    rootStore.auth.logout();
  }, []);
  return useObserver(() => (
    <div className="bg-white mx-auto p-10">
      <div className="flex justify-end">
        {isAdmin ? (
          <button
            onClick={() => logout()}
            className="rounded-md bg-red-300 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={login}
            className="rounded-md bg-teal-400 px-2.5 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-teal-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            Login
          </button>
        )}
      </div>

      {error && <ErrorBlock />}
      <p className="text-2xl text-center"> TODO LIST</p>

      <TaskForm />
      <TaskTable isAdmin={isAdmin} />
    </div>
  ));
}

export default App;
