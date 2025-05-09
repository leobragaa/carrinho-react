import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './c_style.css';

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numeroCasa, setNumero] = useState('');
  const [tipo, setTipo] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = () =>{
    navigate("/login");
  }
  const handleCadastro = () => {
    if (!nome || !email || !senha || !rua || !cep || !numeroCasa || !tipo ) {
      alert('Preencha todos os campos!');
      return;
    }else{
      alert('Cadastro Realizado!')
    }
    console.log(
      'Nome: ', nome, 
      'Email: ', email, 
      'Rua: ', rua,
      'Cep: ', cep,
      'Numero: ', numeroCasa,
      'Tipo: ', tipo,
      'Senha: ', senha
    );
  };
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Cadastro</h2>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
          />
        </div>
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
          <label>Cep</label>
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="**** - ***"
          />
          <label>Rua</label>
          <input
            type="text"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            placeholder="Informe o nome da Rua"
          />
          <label>Numero</label>
          <input
            type="number"
            value={numeroCasa}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="123"
          />
          <label>Tipo</label>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Casa/Apartamento"
          />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Crie uma senha"
          />
        </div>
        <button className="btn telaLogin" onClick={handleLogin}>
          Login
        </button>
        <button className="btn success" onClick={handleCadastro}>
          Cadastrar
        </button>
      </div>
    </div>
  );
}