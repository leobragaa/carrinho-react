import React, { useState } from "react";
import axios from "axios";
import "./styleController.css";

export default function CreateProduct() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagemFile, setImagemFile] = useState(null); // Imagem como arquivo
  const [mensagem, setMensagem] = useState(null);
  const [produtos, setProdutos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !valor || !imagemFile) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // Envia a imagem para o backend
      const formData = new FormData();
      formData.append("imagem", imagemFile);

      const uploadResponse = await axios.post("http://localhost:3001/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imagemUrl = uploadResponse.data.imageUrl;

      // Envia os dados do produto
      const produtoResponse = await axios.post("http://localhost:3001/produtos", {
        nome,
        preco: valor,
        descricao: "", // opcional
        imagemUrl,
      });

      setProdutos([...produtos, produtoResponse.data]);
      setMensagem("Produto criado com sucesso!");
      setNome("");
      setValor("");
      setImagemFile(null);
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao criar produto.");
    }
  };

  return (
    <div className="produto-form-container">
      <h2>Criar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="produto-form">
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Valor:</label>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} step="0.01" />
        </div>
        <div className="form-group">
          <label>Imagem (arquivo):</label>
          <input type="file" onChange={(e) => setImagemFile(e.target.files[0])} />
        </div>
        <button type="submit" className="submit-button">Criar Produto</button>
      </form>

      {mensagem && <div className="mensagem">{mensagem}</div>}

      <div className="lista-produtos">
        <h3>Produtos Criados:</h3>
        {produtos.length === 0 ? (
          <p>Nenhum produto criado ainda.</p>
        ) : (
          <ul>
            {produtos.map((produto) => (
              <li key={produto.id} className="produto-item">
                <h4>{produto.nome}</h4>
                <p>Valor: R$ {produto.preco.toFixed(2)}</p>
                {produto.imagemUrl && (
                  <img
                    src={produto.imagemUrl}
                    alt={produto.nome}
                    className="produto-imagem"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150?text=Imagem+indisponível";
                    }}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}