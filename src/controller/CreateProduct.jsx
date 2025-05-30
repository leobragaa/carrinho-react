import React, { useState } from "react";
import "./styleController.css";

export default function CreateProduct() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [imagem, setImagem] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !valor || !imagem) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    const produto = {
      nome,
      valor: parseFloat(valor),
      imagem,
      id: Date.now(), // Usamos o timestamp como ID único
    };

    try {
      // Adiciona o novo produto à lista de produtos
      setProdutos([...produtos, produto]);
      setMensagem("Produto criado com sucesso!");
      setNome("");
      setValor("");
      setImagem("");
    } catch (error) {
      setMensagem("Erro ao criar produto.");
      console.error(error);
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
          />
        </div>
        <div className="form-group">
          <label>Valor:</label>
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label>URL da Imagem:</label>
          <input
            type="text"
            value={imagem}
            onChange={(e) => setImagem(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Criar Produto
        </button>
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
                <p>Valor: R$ {produto.valor.toFixed(2)}</p>
                {produto.imagem && (
                  <img 
                    src={produto.imagem} 
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