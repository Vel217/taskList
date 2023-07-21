export const signIn = async (name, password) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/auth`;

    const data = {
      username: name,
      password: password,
    };

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const logOut = async (userId) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/auth/auth`;
    const data = {
      userId: userId,
    };

    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        userId: userId,
      },

      body: JSON.stringify(data),
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const authGet = async (userId) => {
  try {
    const url = `${
      process.env.REACT_APP_BACKEND_URL
    }/auth/auth?userId=${+userId}`;

    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
