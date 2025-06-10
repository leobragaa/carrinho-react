import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../login/l_style.css";
import { API_BASE_URL } from "../../api/config";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "", email: "", senha: "", confirmarSenha: "",
    cep: "", rua: "", numero: "", tipo: ""
  });
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmar, setVerConfirmar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleCadastro = async () => {
    const { nome, email, senha, confirmarSenha, cep, rua, numero, tipo } = form;
    if (!nome || !email || !senha || !confirmarSenha || !cep || !rua || !numero || !tipo) {
      alert("Preencha todos os campos!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Email inválido!");
      return;
    }
    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/auth/registrar`, {
        nome, email, senha, cep, rua, numero, tipo
      });
      alert("Cadastro realizado com sucesso!");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao se conectar com o servidor.";
      alert(msg);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Cadastro de Usuário</h2>

        <div className="form-group">
          <input type="text" name="nome" placeholder="Nome Completo"
            value={form.nome} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="email" name="email" placeholder="Email"
            value={form.email} onChange={handleChange} />
        </div>

        <div className="form-group senha-field">
          <input type={verSenha ? "text" : "password"} name="senha"
            placeholder="Senha" value={form.senha} onChange={handleChange} />
          <button type="button" className="ver-senha"
            onClick={() => setVerSenha(!verSenha)}>
            {verSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <div className="form-group senha-field">
          <input type={verConfirmar ? "text" : "password"} name="confirmarSenha"
            placeholder="Confirmar Senha" value={form.confirmarSenha}
            onChange={handleChange} />
          <button type="button" className="ver-senha"
            onClick={() => setVerConfirmar(!verConfirmar)}>
            {verConfirmar ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <div className="form-group">
          <input type="text" name="cep" placeholder="CEP"
            value={form.cep} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="text" name="rua" placeholder="Rua"
            value={form.rua} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="text" name="numero" placeholder="Número"
            value={form.numero} onChange={handleChange} />
        </div>

        <div className="form-group">
          <input type="text" name="tipo" placeholder="Tipo (Apartamento/Casa)"
            value={form.tipo} onChange={handleChange} />
        </div>

        <div className="btn-group">
          <button className="btn primary" onClick={handleCadastro}>Cadastrar</button>
          <button className="btn login" onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
