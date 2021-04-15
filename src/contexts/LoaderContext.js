import React, { createContext, useState, useContext } from "react";

const LoaderContext = createContext({});

export default function LoaderProvider ({ children }) {
  const [isShowFullLoader, setShowFullLoader] = useState(false);
  const [isShowBodyLoader, setShowBodyLoader] = useState(false);

  const showBodyLoader = () => {
    setShowBodyLoader(true);
  }

  const showFullLoader = () => {
    setShowFullLoader(true);
  }

  const hideLoader = () => {
    setShowFullLoader(false);
    setShowBodyLoader(false);
  }

  return (
    <LoaderContext.Provider
      value={{
        isShowFullLoader,
        isShowBodyLoader,
        showFullLoader,
        showBodyLoader,
        hideLoader
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader(hideContent = false) {
  const { isShowFullLoader, isShowBodyLoader, showFullLoader, showBodyLoader, hideLoader, } = useContext(LoaderContext);
  return { isShowFullLoader, isShowBodyLoader, showFullLoader, showBodyLoader, hideLoader };
}
