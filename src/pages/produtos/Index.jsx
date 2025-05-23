import React, { useState } from "react";
import { ProdutoContext } from '../context/ProdutoContext';
import "./styles.css";

export default function Index() {
  const [carrinho, setCarrinho] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const { produtos, setProdutos } = useContext(ProdutoContext);

  const adicionarAoCarrinho = (produto) => {
    // Verifica se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.produto.nome === produto.nome);
    
    if (itemExistente) {
      // Se já existe, atualiza a quantidade
      const novoCarrinho = carrinho.map(item => 
        item.produto.nome === produto.nome 
          ? { ...item, quantidade: item.quantidade + 1 } 
          : item
      );
      setCarrinho(novoCarrinho);
    } else {
      // Se não existe, adiciona ao carrinho
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
    }
    
    setTotalItens(totalItens + 1);
  };

  const removerDoCarrinho = (produtoNome) => {
    const itemExistente = carrinho.find(item => item.produto.nome === produtoNome);
    
    if (itemExistente) {
      if (itemExistente.quantidade > 1) {
        // Diminui a quantidade
        const novoCarrinho = carrinho.map(item => 
          item.produto.nome === produtoNome 
            ? { ...item, quantidade: item.quantidade - 1 } 
            : item
        );
        setCarrinho(novoCarrinho);
      } else {
        // Remove o item
        const novoCarrinho = carrinho.filter(item => item.produto.nome !== produtoNome);
        setCarrinho(novoCarrinho);
      }
      
      setTotalItens(totalItens - 1);
    }
  };

  const calcularTotal = () => {
    return carrinho.reduce((total, item) => {
      return total + (item.produto.valor * item.quantidade);
    }, 0);
  };

  const toggleCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
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

      <div className={`carrinho ${carrinhoAberto ? 'aberto' : ''}`}>
        <div className="cabecalho">
          <h2>
            Seu carrinho tem <span className="destaque">{totalItens} itens</span>
          </h2>
          <button className="botao-fechar" onClick={toggleCarrinho}>×</button>
        </div>

        <div className="itens">
          {carrinho.length > 0 ? (
            carrinho.map((item, index) => (
              <div className="item" key={index}>
                <div className="imagem-item">
                  <img src={item.produto.imagem} alt={item.produto.nome} />
                </div>
                <div className="detalhes-item">
                  <h3>{item.produto.nome}</h3>
                  <p className="preco">R$ {item.produto.valor.toFixed(2)}</p>
                </div>
                <div className="controle-quantidade">
                  <button 
                    className="menos" 
                    onClick={() => removerDoCarrinho(item.produto.nome)}
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
            <span className="valor-total">R$ {calcularTotal().toFixed(2)}</span>
          </div>
          <div className="cupom">
            <i className="fas fa-tag"></i>
            <span>Adicionar cupom</span>
          </div>
          <button className="finalizar-compra">Finalizar compra</button>
        </div>
      </div>

      {!carrinhoAberto && (
        <div className="carrinho-toggle" onClick={toggleCarrinho}>
          <span className="carrinho-icone">🛒</span>
          <span className="carrinho-contador">{totalItens}</span>
        </div>
      )}
    </div>
  );
}