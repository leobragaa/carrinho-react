import { Link, useNavigate } from 'react-router-dom';
import "../global/styleSideBar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você limpa o token ou qualquer lógica de logout
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>CADASTRO<br />PRODUTOS</h2>
      <ul className="menu-links">
        <li><Link to="/dashboard/see">📋 Listar Produtos</Link></li>
        <li><Link to="/dashboard/update">✏️ Atualizar Produtos</Link></li>
        <li><Link to="/dashboard/create">➕ Criar Produtos</Link></li>
      </ul>

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">🚪 Sair</button>
      </div>
    </div>
  );
}

