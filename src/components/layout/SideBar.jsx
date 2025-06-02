import { Link, useNavigate } from 'react-router-dom';
import "../layout/styleLayout.css";
import { FaList, FaEdit, FaPlus, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>CADASTRO PRODUTOS</h2>
      <ul className="menu-links">
        <li>
          <Link to="/dashboard/see">
            <FaList className="icon" /> Listar Produtos
          </Link>
        </li>
        <li>
          <Link to="/dashboard/update">
            <FaEdit className="icon" /> Atualizar Produtos
          </Link>
        </li>
        <li>
          <Link to="/dashboard/create">
            <FaPlus className="icon" /> Criar Produtos
          </Link>
        </li>
      </ul>

      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="icon" /> Sair
        </button>
      </div>
    </div>
  );
}
