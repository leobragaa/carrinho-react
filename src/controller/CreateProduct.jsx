import React, { useState } from "react";
import axios from "../axiosConfig";  
import "./styleController.css";

export default function CreateProduct() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagemFile, setImagemFile] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome || !valor || !imagemFile) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    try {

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("descricao", "");            
      formData.append("preco", valor);
      formData.append("image", imagemFile);   

      const res = await axios.post("/api/produtos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMensagem(`Produto "${res.data.nome}" criado com sucesso!`);
      setNome("");
      setValor("");
      setImagemFile(null);
    } catch (err) {
      console.error(err);
      setMensagem("Erro ao criar produto. Verifique o console.");
    }
  };

  return (
    <div className="produto-form-container">
      <h2>Criar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="produto-form">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Valor:</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagemFile(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Criar Produto
        </button>
      </form>

      {mensagem && <div className="mensagem">{mensagem}</div>}
    </div>
  );
}
