import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './l_style.css';
import axios from "axios";
import { API_BASE_URL } from "../../api/config";

export default function Login() {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.senha) {
      setError("Preencha todos os campos!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Email inválido!");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData);

      login({ usuario: response.data.usuario, token: response.data.token });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao fazer login.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">FAÇA SEU LOGIN</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email"
              value={formData.email} onChange={handleChange}
              placeholder="exemplo@email.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password"
              value={formData.senha} onChange={handleChange}
              placeholder="Digite sua senha" required minLength="6" />
          </div>
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </form>
        <div className="link">
          <span>Não tem uma conta? </span>
          <Link to="/cadastro">Crie uma agora</Link>
        </div>
      </div>
    </div>
  );
}
