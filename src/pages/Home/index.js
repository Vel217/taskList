import { useObserver } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "../../config.js";
import TaskForm from "./TaskForm/index.js";
import TaskTable from "./TaskTable/index.js";
import rootStore from "../../stores/CombineStore.js";
import { authGet, logOut } from "../../api/login/login.api.js";
import ErrorBlock from "../../components/ErrorBlock.js";

function App() {
  const navigate = useNavigate();

  const login = () => {
    navigate(LOGIN_PATH);
  };
  useEffect(() => {
    const authId = localStorage.getItem("user");

    authGet(authId).then((res) => {
      if (res.status === 200) {
        rootStore.notification.errorFalse();

        rootStore.auth.login();
      } else {
        rootStore.auth.logout();
      }
    });
  }, [rootStore.auth.isAdmin]);

  const logout = useCallback(() => {
    const userId = localStorage.getItem("user");
    logOut(userId).then((res) => {
      if (res.status === 200) {
      }
      localStorage.removeItem("session");
      localStorage.setItem("session", false);
      rootStore.auth.logout();
    });
    rootStore.auth.logout();
  }, []);
  return useObserver(() => (
    <div className="bg-white mx-auto p-10 relative">
      <div className="flex justify-end">
        {rootStore.auth.isAdmin ? (
          <button
            onClick={() => logout()}
            className="rounded-md bg-red-400 px-2.5 py-1.5 text-sm font-semibold text-gray-50 shadow-md hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={login}
            className="rounded-md bg-blue-500 px-2.5 py-1.5 text-sm font-semibold text-gray-50 shadow-md hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-400"
          >
            Login
          </button>
        )}
      </div>

      {rootStore.notification.notification.error && (
        <ErrorBlock text={"Error while getting data"} />
      )}
      <p className="text-2xl text-center mb-10"> TODO LIST</p>

      <TaskForm />
      <TaskTable />
    </div>
  ));
}

export default App;
