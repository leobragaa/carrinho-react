import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styleController.css";
import { UPLOAD_URL, API_BASE_URL } from "../api/config";

export default function UpdateProduct() {
  const [produtos, setProdutos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [novaImagemFile, setNovaImagemFile] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/produtos`)
      .then(res => setProdutos(res.data))
      .catch(() => setMensagem("Erro ao carregar produtos."));
  }, []);

  const iniciarEdicao = (produto) => {
    setProdutoEditando({ ...produto });
    setMensagem("");
    setNovaImagemFile(null);
  };

  const cancelarEdicao = () => {
    setProdutoEditando(null);
    setNovaImagemFile(null);
    setMensagem("");
  };

  const salvarAlteracoes = async () => {
    try {
      let imagemUrl = produtoEditando.imagem;

      if (novaImagemFile) {
        const formData = new FormData();
        formData.append("imagem", novaImagemFile);
        const uploadRes = await axios.post(`${UPLOAD_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imagemUrl = uploadRes.data.imageUrl;
      }

      await axios.put(`${API_BASE_URL}/produtos/${produtoEditando.id}`, {
        nome: produtoEditando.nome,
        preco: produtoEditando.preco,
        descricao: produtoEditando.descricao || "",
        imagem: imagemUrl,
      });

      const produtosAtualizados = produtos.map((p) =>
        p.id === produtoEditando.id ? { ...produtoEditando, imagem: imagemUrl } : p
      );

      setProdutos(produtosAtualizados);
      setMensagem("Produto atualizado com sucesso.");
      cancelarEdicao();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      setMensagem("Erro ao atualizar o produto.");
    }
  };

  const removerProduto = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/produtos/${id}`);
      setProdutos(produtos.filter((p) => p.id !== id));
      setMensagem("Produto removido com sucesso.");
    } catch (error) {
      console.error("Erro ao remover produto:", error);
      setMensagem("Erro ao remover o produto.");
    }
  };

  return (
    <div className="produto-form-container">
      <h2>Atualizar Produtos</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      <ul className="lista-produtos">
        {produtos.map((produto) => (
          <li key={produto.id} className="produto-item">
            <img src={produto.imagem} alt={produto.nome} className="imagem-produto" />
            <div>
              <h4>{produto.nome}</h4>
              <p>R$ {produto.preco}</p>
              <p>{produto.descricao}</p>
            </div>
            <div className="botoes-produto">
              <button onClick={() => iniciarEdicao(produto)}>Editar</button>
              <button onClick={() => removerProduto(produto.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>

      {produtoEditando && (
        <div className="formulario-edicao">
          <h3>Editando: {produtoEditando.nome}</h3>
          <input
            type="text"
            placeholder="Nome"
            value={produtoEditando.nome}
            onChange={(e) =>
              setProdutoEditando({ ...produtoEditando, nome: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Preço"
            value={produtoEditando.preco}
            onChange={(e) =>
              setProdutoEditando({ ...produtoEditando, preco: e.target.value })
            }
          />
          <textarea
            placeholder="Descrição"
            value={produtoEditando.descricao || ""}
            onChange={(e) =>
              setProdutoEditando({ ...produtoEditando, descricao: e.target.value })
            }
          />
          <input
            type="file"
            onChange={(e) => setNovaImagemFile(e.target.files[0])}
          />
          <div className="botoes-edicao">
            <button onClick={salvarAlteracoes}>Salvar</button>
            <button onClick={cancelarEdicao}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
