import { useCallback, useEffect } from "react";
import "../style.css";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    await logoutRequest(setAuth);
  }, [setAuth]);

  useEffect(() => {
    if (!auth) {
      console.log("redirected");
      navigate("/", { state: { from: "/" }});
    }
  }, [auth, navigate]);

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return null;
};

export default Logout;