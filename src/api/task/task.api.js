export const sendTask = async (name, email, text) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/tasks/task`;

    const data = {
      name: name,
      email: email,
      text: text,
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

export const getTask = async (currentPage, sortBy, sortDirection) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/tasks/task?pageNumber=${currentPage}&sortBy=${sortBy}&sortDirection=${sortDirection}`;

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

export const updateTaskDB = async (text, status, id, userId) => {
  try {
    const url = `${process.env.REACT_APP_BACKEND_URL}/tasks/task`;
    const accessToken = localStorage.getItem("access_token");

    const data = {
      text: text,
      status: status,
      id: id,
      userId: userId,
    };

    const response = await fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
        access_token: `${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
//

export const deleteTaskDB = async (taskId) => {
  try {
    const userId = localStorage.getItem("user");

    const url = `${process.env.REACT_APP_BACKEND_URL}/tasks/task?userId=${userId}&taskId=${taskId}`;

    const response = await fetch(url, {
      method: "DELETE",
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
