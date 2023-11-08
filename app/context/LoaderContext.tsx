import React, { createContext, useContext, useState, ReactNode } from 'react';

type LoadingContextType = {
  setLoading: (loading: boolean) => void;
  loading: boolean;
};

const LoadingContext = createContext<LoadingContextType>({
  setLoading: () => { },
  loading: false,
});

export const useLoading = () => useContext(LoadingContext);

type Props = {
  children: ReactNode;
};

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ setLoading, loading }}>
      {children}
    </LoadingContext.Provider>
  );
};


