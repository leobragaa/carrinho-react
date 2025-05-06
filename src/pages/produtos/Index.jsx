import React from "react";
import { produtos } from "./produto";
import "./styles.css";

export default function Index() {
  const adicionarAoCarrinho = (produto) => {
    console.log("Produto adicionado ao carrinho:", produto);
  };
  return (
    <div className="produtos-container">
      <div className="produtos-grid">
        {produtos.map((produto, index) => (
          <div className="produto-card" key={index}>
            <div className="produto-imagem">
              <img src={produto.imagem} alt={produto.nome} />
            </div>
            <h3 className="produto-nome">{produto.nome}</h3>
            <p className="produto-preco">R$ {produto.valor.toFixed(2)}</p>
            <button 
              className="botao-adicionar" 
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
      <div className="carrinho-toggle">
          <span className="carrinho-icone">🛒</span>
        </div>
    </div>
  );
}