/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  })
  
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  },[])
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  },[]);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  },[])

  const registerUser = useCallback(async () => {
    setIsLoading(true);
    setRegisterError(null);
    const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
    setIsLoading(false);
    if(response.error) {
      return setRegisterError(response)
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response)
  },[registerInfo]);

  const loginUser = useCallback(async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
    setIsLoading(false);
    if(response.error) {
      return setLoginError(response)
    }
    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  },[loginInfo]);

  const logoutUser = useCallback( () => {
    localStorage.removeItem("User");
    setUser(null);
  },[])

  
  return <AuthContext.Provider
    value={{
      user,
      registerInfo,
      updateRegisterInfo,
      registerUser,
      registerError,
      setRegisterError,
      isLoading,
      logoutUser,
      loginInfo,
      updateLoginInfo,
      loginUser,
      loginError,
    }}
  >
    {children}
  </AuthContext.Provider>;
};
