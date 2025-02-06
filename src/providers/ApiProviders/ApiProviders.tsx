import { createContext, useContext } from "react";

const APIContext = createContext({ apiUrl: "" });

export function APIProvider({ children }: { children: React.ReactNode }) {
  return (
      <APIContext.Provider value={{ apiUrl: process.env.NEXT_PUBLIC_API_GSO || "" }}>
        {children}
      </APIContext.Provider>
  );
}

export function useAPI() {
  return useContext(APIContext);
}
