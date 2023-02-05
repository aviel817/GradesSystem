import { useCallback, useEffect } from "react";
import "../style.css";
import useAuth from "../hooks/useAuth";

const logoutRequest = async (setAuth) => {
  try {
    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(response);
    if (response.status === 200) {
      console.log("logged out");
      setAuth({});
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

const Logout = () => {
  const { setAuth } = useAuth();

  const handleLogout = useCallback(async () => {
    await logoutRequest(setAuth);
  }, [setAuth]);


  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null;
};

export default Logout;