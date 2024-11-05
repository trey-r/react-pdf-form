import React, { useState, useEffect, useContext } from "react";

const UserContext = React.createContext({
  username: "",
  onSetUser: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);

  const onSetUser = (username) => {
    setUsername(username);
    localStorage.setItem("username", username);
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
        setUsername(username);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, onSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContextProvider."
    );
  }
  return context;
};
