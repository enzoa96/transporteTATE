import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Route, Router, useHistory } from "react-router";

const LOCAL_STORAGE_KEY = "tateprueba";
const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [token, setToken] = useState("");

  const history = useHistory();
  React.useEffect(() => {
    if (localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)) {
      setToken(localStorage.getItem(LOCAL_STORAGE_KEY));
    }
  }, []);

  const login = (username, password) => {
    const body = {
      username: username,
      password: password,
    };

    return axios
      .post("http://api.tate.com.ar:8083/api/login/authenticate", body)

      .then((res) => {
        const { data } = res;
        const { id_token } = data;
        if (id_token) {
          console.log("logeado");
          localStorage.setItem(LOCAL_STORAGE_KEY, id_token);
          setToken(id_token);
        } else {
          throw new Error("no logeado");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isLoggedin = () => {
    return token !== null && token !== "";
  };

  return {
    login,
    token,
    isLoggedin,
  };
}
