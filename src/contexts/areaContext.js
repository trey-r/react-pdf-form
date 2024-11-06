import React, { useState, useEffect, useContext } from "react";

const AreaContext = React.createContext({
  areas: null,
  onSetAreas: () => {},
});

export const AreaContextProvider = ({ children }) => {
  const [areas, setAreas] = useState(null);

  const onSetAreas = (areaname, selectedStrategies) => {
    const areasToUpdate = {...areas};
    areasToUpdate[areaname] = selectedStrategies
    setAreas(areasToUpdate);
  };

  const onResetAreas = () => {
    setAreas(null);
  }

  return (
    <AreaContext.Provider value={{ areas, onSetAreas, onResetAreas }}>
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
