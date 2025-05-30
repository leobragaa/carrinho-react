import React, { useState, useEffect } from "react";
import "./styleController.css";

export default function UpdateProduct() {

  const [produtos, setProdutos] = useState([
    {
      id: 1,
      nome: "Produto Exemplo 1",
      valor: 19.99,
      imagem: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      nome: "Produto Exemplo 2",
      valor: 29.99,
      imagem: "https://via.placeholder.com/150"
    }
  ]);
  
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [mensagem, setMensagem] = useState(null);


  const abrirModal = (produto) => {
    setProdutoEditando({ ...produto });
    setModalAberto(true);
    setMensagem(null);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoEditando(null);
    setMensagem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoEditando((prev) => ({ 
      ...prev, 
      [name]: name === "valor" ? parseFloat(value) || 0 : value 
    }));
  };

    const salvarAlteracoes = () => {
    if (!produtoEditando.nome || !produtoEditando.valor || !produtoEditando.imagem) {
        setMensagem("Preencha todos os campos.");
        return;
    }

    try {
        // Atualiza o produto na lista local
        setProdutos(produtos.map(produto => 
        produto.id === produtoEditando.id ? produtoEditando : produto
        ));
        
        setMensagem("Produto atualizado com sucesso!");
        fecharModal();
    } catch (error) {
        setMensagem("Erro ao atualizar produto.");
        console.error(error);
    }
    };
    const removerProduto = (id) => {
        if (!window.confirm("Tem certeza que deseja remover este produto?")) return;

        try {
        // Remove o produto da lista local
        setProdutos(produtos.filter(produto => produto.id !== id));
        setMensagem("Produto removido com sucesso!");
        } catch (error) {
        setMensagem("Erro ao remover produto.");
        console.error(error);
        }
    };

  return (
    <div className="produto-form-container">
      <h2>Atualizar Produtos</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      <div className="lista-produtos">
        {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
        {produtos.map((produto) => (
          <div key={produto.id} className="produto-item">
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              width={80}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Imagem+indisponível";
              }}
            />
            <div className="info-produto">
              <h3>{produto.nome}</h3>
              <p>R$ {produto.valor.toFixed(2)}</p>
            </div>
            <div className="acoes-produto">
              <button onClick={() => abrirModal(produto)}>Editar</button>
              <button onClick={() => removerProduto(produto.id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>

      {modalAberto && produtoEditando && (
        <div className="modal">
          <div className="modal-conteudo">
            <h3>Editar Produto</h3>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={produtoEditando.nome}
                onChange={handleChange}
              />
            </label>
            <label>
              Valor:
              <input
                type="number"
                step="0.01"
                name="valor"
                value={produtoEditando.valor}
                onChange={handleChange}
              />
            </label>
            <label>
              URL da Imagem:
              <input
                type="url"
                name="imagem"
                value={produtoEditando.imagem}
                onChange={handleChange}
              />
            </label>
            <div className="botoes-modal">
              <button onClick={salvarAlteracoes}>Salvar</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
            {mensagem && <p className="mensagem">{mensagem}</p>}
          </div>
        </div>
      )}
    </div>
  );
}