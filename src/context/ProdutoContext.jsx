
import { createContext, useState } from "react";

export const ProdutoContext = createContext();

export function ProdutoProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  
  const value = {
    produtos,
    setProdutos,
  };

  return (
    <ProdutoContext.Provider value={value}>
      {children}
    </ProdutoContext.Provider>
  );
}