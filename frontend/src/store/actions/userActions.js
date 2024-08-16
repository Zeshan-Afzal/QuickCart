export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });
    const res = await fetch("/api/user/get-user", {
      headers: { 'ngrok-skip-browser-warning': 'any-value' },
    });
    const data = await res.json();

    if (!data.success)
      return dispatch({ type: "loadUserFailiure", payload: data.message });
    console.log(data);
    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loadUserFailiure", payload: error.message });
  }
};

export const updateUser = (data) => async (dispatch) => {
 

    dispatch({ type: "loadUserSuccess", payload: data });
 
}


export const activatUser = (token) => async (dispatch) => {
  console.log(token);
  try {
    const res = await fetch(
      "http://localhost:3000/api/user/activation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'any-value',
        },
        body: JSON.stringify({ token }),
      },
      { withCredentials: true }
    );

    const data = await res.json();
    if (!data.success) {
      console.log(data);
      return;
    }
    console.log(data);
    dispatch({ type: "activatUser", payload: data });
  } catch (error) {
    console.log(error);
  }
};
