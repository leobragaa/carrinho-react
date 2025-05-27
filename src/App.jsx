import { AuthProvider } from "./context/AuthContext";
import { ProdutoProvider } from "./context/ProdutoContext";
import AppRoutes from "./components/routers/route";

export default function App() {
  return (
    <AuthProvider>
      <ProdutoProvider>
        <AppRoutes />
      </ProdutoProvider>
    </AuthProvider>
  );
}