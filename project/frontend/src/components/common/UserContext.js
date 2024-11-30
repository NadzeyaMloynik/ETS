import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPic, setUserPic] = useState(null);

  return (
    <UserContext.Provider value={{ userPic, setUserPic }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);