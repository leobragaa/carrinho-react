import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProdutoContext = createContext();

export const ProdutoProvider = ({ children }) => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get('/api/produtos');
        setProdutos(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <ProdutoContext.Provider value={{ produtos }}>
      {children}
    </ProdutoContext.Provider>
  );
};

export const useProdutos = () => useContext(ProdutoContext);
