import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../api/login/login.api.js";
import Input from "../../components/Input.js";
import ErrorBlock from "../../components/ErrorBlock.js";
import { HOME_PATH } from "../../config.js";
import rootStore from "../../stores/CombineStore.js";
import { useObserver } from "mobx-react-lite";

function SignIn() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (name || password) setError(false);
  }, [name, password]);
  const store = rootStore;
  const isAdmin = store.auth.isAdmin;
  const adminLogin = (e) => {
    e.preventDefault();
    signIn(name, password)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.body) {
          setError(true);
        } else {
          const { session, userId } = res;
          if (session && userId) {
            localStorage.setItem("user", userId);
            localStorage.setItem("session", session);
            store.auth.login();
            navigate(HOME_PATH);
          } else {
            setError(true);
          }
        }
      });
  };

  return useObserver(() => (
    <div className=" min-h-full w-full">
      {!isAdmin ? (
        <form
          className="border-2 border-solid border-slay-700 rounded-md p-10 w-1/2 flex flex-col gap-5 m-auto mt-10"
          onSubmit={adminLogin}
        >
          <h1 className="text-center text-2xl"> LOGIN</h1>

          <Input
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Fill name"
          />

          <Input
            label="Password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Fill password"
          />

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            SignIn
          </button>

          {error && <ErrorBlock text="Authentication error" />}
        </form>
      ) : (
        navigate("/")
      )}
    </div>
  ));
}

export default SignIn;
