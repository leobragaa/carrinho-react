import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SeeProduct() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/produtos")
      .then((res) => setProdutos(res.data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {produtos.map((produto) => (
            <li key={produto.id}>
              <h3>{produto.nome}</h3>
              <p>R$ {produto.preco.toFixed(2)}</p>
              {produto.imagemUrl && (
                <img
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  width={150}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150?text=Sem+Imagem";
                  }}
                />
              )}
              {produto.descricao && <p>{produto.descricao}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
