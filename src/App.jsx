import { AuthProvider } from "./context/AuthContext";
import { ProdutoProvider } from "./context/ProdutoContext";
import Routers from "./components/routers/Routers";

export default function App() {
  return (
    <AuthProvider>
      <ProdutoProvider>
        <Routers />
      </ProdutoProvider>
    </AuthProvider>
  );
}