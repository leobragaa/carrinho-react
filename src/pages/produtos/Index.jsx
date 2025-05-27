import React, { useState, useContext, useMemo } from "react";
import { ProdutoContext } from "../../context/ProdutoContext";
import "./styles.css";

export default function Index() {
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const { produtos } = useContext(ProdutoContext);

  // Calcula o total de itens baseado no carrinho
  const totalItens = useMemo(() => (
    carrinho.reduce((total, item) => total + item.quantidade, 0)
  ), [carrinho]);

  // Calcula o valor total do carrinho
  const totalCarrinho = useMemo(() => (
    carrinho.reduce((total, item) => (
      total + (item.produto.valor * item.quantidade)
    ), 0)
  ), [carrinho]);

  const adicionarAoCarrinho = (produto) => {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.produto.id === produto.id);
      
      if (itemExistente) {
        return prev.map(item => 
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinho(prev => {
      const itemExistente = prev.find(item => item.produto.id === produtoId);
      
      if (!itemExistente) return prev;
      
      return itemExistente.quantidade > 1
        ? prev.map(item => 
            item.produto.id === produtoId
              ? { ...item, quantidade: item.quantidade - 1 }
              : item
          )
        : prev.filter(item => item.produto.id !== produtoId);
    });
  };

  const toggleCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
  };

  return (
    <div className="produtos-container">
      <div className="produtos-grid">
        {produtos.map((produto) => (
          <div className="produto-card" key={produto.id}>
            <div className="produto-imagem">
              <img 
                src={produto.imagem} 
                alt={produto.nome} 
                onError={(e) => {
                  e.target.src = 'caminho/para/imagem-padrao.jpg';
                }}
              />
            </div>
            <h3 className="produto-nome">{produto.nome}</h3>
            <p className="produto-preco">
              {produto.valor.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
            <button
              className="botao-adicionar"
              onClick={() => adicionarAoCarrinho(produto)}
            >
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      {/* Componente de Carrinho */}
      <div className={`carrinho ${carrinhoAberto ? 'aberto' : ''}`}>
        <div className="cabecalho">
          <h2>
            Seu carrinho <span className="destaque">({totalItens} itens)</span>
          </h2>
          <button className="botao-fechar" onClick={toggleCarrinho}>×</button>
        </div>

        <div className="itens">
          {carrinho.length > 0 ? (
            carrinho.map((item) => (
              <div className="item" key={item.produto.id}>
                <div className="imagem-item">
                  <img src={item.produto.imagem} alt={item.produto.nome} />
                </div>
                <div className="detalhes-item">
                  <h3>{item.produto.nome}</h3>
                  <p className="preco">
                    {item.produto.valor.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>
                <div className="controle-quantidade">
                  <button
                    className="menos"
                    onClick={() => removerDoCarrinho(item.produto.id)}
                  >
                    -
                  </button>
                  <span className="quantidade">{item.quantidade}</span>
                  <button
                    className="mais"
                    onClick={() => adicionarAoCarrinho(item.produto)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="carrinho-vazio">Seu carrinho está vazio</p>
          )}
        </div>

        <div className="rodape">
          <div className="total">
            <span>Total:</span>
            <span className="valor-total">
              {totalCarrinho.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </div>
          <button className="finalizar-compra">Finalizar compra</button>
        </div>
      </div>

      {/* Botão flutuante do carrinho */}
      {!carrinhoAberto && (
        <div className="carrinho-toggle" onClick={toggleCarrinho}>
          <span className="carrinho-icone">🛒</span>
          {totalItens > 0 && (
            <span className="carrinho-contador">{totalItens}</span>
          )}
        </div>
      )}
    </div>
  );
}