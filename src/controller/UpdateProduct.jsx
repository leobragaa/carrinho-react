import React, { useState } from "react";
import axios from "axios";
import "./styleController.css";

export default function UpdateProduct() {
  const [produtos, setProdutos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novaImagemFile, setNovaImagemFile] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  // Carregar produtos do backend
  React.useEffect(() => {
    axios.get("http://localhost:3001/produtos").then(res => setProdutos(res.data));
  }, []);

  const abrirModal = (produto) => {
    setProdutoEditando({ ...produto });
    setModalAberto(true);
    setMensagem(null);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoEditando(null);
    setNovaImagemFile(null);
    setMensagem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoEditando((prev) => ({
      ...prev,
      [name]: name === "preco" ? parseFloat(value) || 0 : value,
    }));
  };

  const salvarAlteracoes = async () => {
    if (!produtoEditando.nome || !produtoEditando.preco) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    try {
      let imagemUrl = produtoEditando.imagemUrl;

      // Se uma nova imagem foi selecionada, fazer o upload
      if (novaImagemFile) {
        const formData = new FormData();
        formData.append("imagem", novaImagemFile);

        const uploadRes = await axios.post("http://localhost:3001/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        imagemUrl = uploadRes.data.imageUrl;
      }

      // Atualiza produto
      const res = await axios.put(`http://localhost:3001/produtos/${produtoEditando.id}`, {
        nome: produtoEditando.nome,
        preco: produtoEditando.preco,
        descricao: produtoEditando.descricao || "",
        imagemUrl,
      });

      // Atualiza localmente
      setProdutos(produtos.map(p => p.id === res.data.id ? res.data : p));
      fecharModal();
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao atualizar produto.");
    }
  };

  const removerProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este produto?")) return;

    try {
      await axios.delete(`http://localhost:3001/produtos/${id}`);
      setProdutos(produtos.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      setMensagem("Erro ao remover produto.");
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
              src={produto.imagemUrl}
              alt={produto.nome}
              width={80}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/150?text=Sem+Imagem";
              }}
            />
            <div className="info-produto">
              <h3>{produto.nome}</h3>
              <p>R$ {produto.preco.toFixed(2)}</p>
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
            <label>Nome:
              <input type="text" name="nome" value={produtoEditando.nome} onChange={handleChange} />
            </label>
            <label>Preço:
              <input type="number" step="0.01" name="preco" value={produtoEditando.preco} onChange={handleChange} />
            </label>
            <label>Nova Imagem:
              <input type="file" onChange={(e) => setNovaImagemFile(e.target.files[0])} />
            </label>
            <div className="botoes-modal">
              <button onClick={salvarAlteracoes}>Salvar</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
