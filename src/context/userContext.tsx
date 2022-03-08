/*eslint-disable */

import React, { createContext, useState, useEffect } from "react";
import { IChildrenProps } from "../interfaces/childrenPropsInterface";
import { IUser } from "../interfaces/userInterface";
import { useLazyQuery } from "@apollo/client";
import { QUERY_ME } from "../servises/queries/queryMe";
type SetToken = (token: string) => void;
interface IContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  setToken: SetToken;
  logOutUser: () => void;
  activeConvId: number | null;
  setActiveConvId: React.Dispatch<React.SetStateAction<number | null>>;
  loading: boolean;
}
export const userContext = createContext<IContextType>({} as IContextType);

const UserContextProvider = ({ children }: IChildrenProps) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [activeConvId, setActiveConvId] = useState<number | null>(null);
  const removeToken = () => localStorage.removeItem("token");
  const [meQuery, { loading }] = useLazyQuery(QUERY_ME, {
    onCompleted: (data) => {
      setUser(data.me.user);
    },
    onError: () => {
      removeToken();
    },
  });

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logOutUser = () => {
    removeToken();
    setUser(null);
  };
  const providerValue = {
    user,
    setUser,
    setToken,
    logOutUser,
    activeConvId,
    setActiveConvId,
    loading,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    meQuery();
  }, []);
  return (
    <userContext.Provider value={providerValue}>
      {children}
    </userContext.Provider>
  );
};
export default UserContextProvider;
