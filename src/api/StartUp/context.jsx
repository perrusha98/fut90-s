import React, { createContext, useState } from 'react';

const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  const storeApiData = (data) => {
    setApiData(data);
  };

  return (
    <ApiDataContext.Provider value={{ apiData, storeApiData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export default ApiDataContext;
