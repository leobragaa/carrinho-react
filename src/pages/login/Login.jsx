import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './l_style.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      // Simulação de requisição de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Aqui você faria a chamada real à API:
      // const response = await api.post('/login', formData);
      // localStorage.setItem('token', response.data.token);
      
      navigate("/produtos");
    } catch (err) {
      setError("Credenciais inválidas ou erro no servidor");
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
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
              required
              minLength="6"
            />
          </div>
          
          <button 
            type="submit" 
            className="btn primary" 
            disabled={loading}
          >
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