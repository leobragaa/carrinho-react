import React from "react";
import { ProdutoContext } from "./context/ProdutoContext";

function App() {

  return (
    <ProdutoContext>
      <AppRoutes />
    </ProdutoContext>
  );
}

export default App;
