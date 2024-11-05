import React, { useState, useEffect, useContext } from "react";

const AreaContext = React.createContext({
  areas: {},
  onSetAreas: () => {},
});

export const AreaContextProvider = ({ children }) => {
  const [areas, setAreas] = useState(null);

  const onSetAreas = (areaname, selectedStrategies) => {
    const areasToUpdate = {...areas};
    areasToUpdate[areaname] = selectedStrategies
    setAreas(areasToUpdate);
  };

  return (
    <AreaContext.Provider value={{ areas, onSetAreas }}>
      {children}
    </AreaContext.Provider>
  );
};

export const useAreaContext = () => {
  const context = useContext(AreaContext);
  if (!context) {
    throw new Error(
      "useAreaContext must be used within a AreaContextProvider."
    );
  }
  return context;
};
