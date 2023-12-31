import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../api/login/login.api.js";
import Input from "../../components/Input.js";
import ErrorBlock from "../../components/ErrorBlock.js";
import { HOME_PATH } from "../../config.js";
import rootStore from "../../stores/CombineStore.js";
import { useObserver } from "mobx-react-lite";

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (rootStore.signIn.signIn.name || rootStore.signIn.signIn.password)
      rootStore.signIn.errorFalse();
  }, [rootStore.signIn.signIn.name, rootStore.signIn.signIn.password]);

  const adminLogin = (e) => {
    e.preventDefault();
    signIn(rootStore.signIn.signIn.name, rootStore.signIn.signIn.password)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res.body) {
          rootStore.signIn.errorTrue();
        } else {
          const { session, userId } = res;
          if (session && userId) {
            localStorage.setItem("user", userId);
            localStorage.setItem("session", session);
            rootStore.auth.login();
            rootStore.signIn.reset();
            navigate(HOME_PATH);
          } else {
            rootStore.signIn.errorTrue();
          }
        }
      });
  };

  return useObserver(() => (
    <div className=" min-h-full w-full relative">
      {!rootStore.auth.isAdmin ? (
        <form
          className="shadow-xl rounded-md p-10 w-1/2 flex flex-col gap-5 m-auto mt-10"
          onSubmit={adminLogin}
        >
          <h1 className="text-center text-2xl"> LOGIN</h1>

          <Input
            label="Name"
            value={rootStore.signIn.signIn.name}
            onChange={(e) => {
              rootStore.signIn.addName(e.target.value);
            }}
            placeholder="Fill name"
          />

          <Input
            label="Password"
            value={rootStore.signIn.signIn.password}
            type="password"
            onChange={(e) => {
              rootStore.signIn.addPassword(e.target.value);
            }}
            placeholder="Fill password"
          />

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            SignIn
          </button>

          {rootStore.signIn.signIn.error && (
            <ErrorBlock text="Authentication error" />
          )}
        </form>
      ) : (
        navigate("/")
      )}
    </div>
  ));
}

export default SignIn;
