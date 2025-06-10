import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";          // <- ajustado

export default function SeeProduct() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await axios.get("/api/produtos");  // baseURL já configurada
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    };
    fetchProdutos();
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {produtos.map((produto) => (
            <li key={produto.id} style={{ marginBottom: 20 }}>
              <h3>{produto.nome}</h3>
              <p>R$ {produto.preco.toFixed(2)}</p>
              <img
                src={produto.imagem
                  ? produto.imagem.startsWith("http")
                    ? produto.imagem
                    : `${axios.defaults.baseURL}${produto.imagem}`
                  : "https://via.placeholder.com/150?text=Sem+Imagem"
                }
                alt={produto.nome}
                width={150}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=Sem+Imagem";
                }}
              />
              {produto.descricao && <p>{produto.descricao}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
