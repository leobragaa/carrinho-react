import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './l_style.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
      if (!email || !senha) {
        alert("Preencha todos os campos!");
        return;
      }else{
        alert("Login Feito")
      }
      navigate("/produtos");
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">FAÇA SEU LOGIN!</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="exemplo@email.com"
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
          />
        </div>
        <button className="btn primary" onClick={handleLogin}>
          Entrar
        </button>
        <div className="link">
          <Link to="/cadastro">Criar conta</Link>
        </div>
      </div>
    </div>
  );
}