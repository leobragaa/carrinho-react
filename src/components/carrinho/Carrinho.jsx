//codigo do carrinho
import React from "react";
import '../../pages/produtos/style.css';
import ImgCadeira from "../../assets/CadeiraGamer.jpg"
import ImgHeadSet from "../../assets/HeadsetGamer.jpg"
import ImgMonitor from "../../assets/MonitoGamer.jpg"
import ImgPato from "../../assets/Pato.jpg"
import ImgTeclado from "../../assets/TecladoGamer.jpg"

export default function Carrinho() {
  return (
    <div className="container">
      <div className="carrinho">
        <div className="cabecalho">
          <h2>
            Seu carrinho tem <span className="destaque">5 itens</span>
          </h2>
          <button className="botao-fechar">×</button>
        </div>

        <div className="itens">
          <div className="item">
            <div className="imagem-item">
                <img src={ImgMonitor}  />
            </div>
            <div className="detalhes-item">
              <h3>Monitor Gamer Curvo 49 DQHD, 240Hz, 1ms, HDMI e...</h3>
              <p className="preco">R$ 8.599,90</p>
            </div>
            <div className="controle-quantidade">
              <button className="menos">-</button>
              <span className="quantidade">1</span>
              <button className="mais">+</button>
            </div>
          </div>

          <div className="item">
            <div className="imagem-item">
                <img src={ImgCadeira}  />
            </div>
            <div className="detalhes-item">
              <h3>Cadeira Gamer RGB - Preta com Iluminação (Led)</h3>
              <p className="preco">R$ 959,90</p>
            </div>
            <div className="controle-quantidade">
              <button className="menos">-</button>
              <span className="quantidade">1</span>
              <button className="mais">+</button>
            </div>
          </div>

          <div className="item">
            <div className="imagem-item">
                 <img src={ImgTeclado}  />
            </div>
            <div className="detalhes-item">
              <h3>Teclado Gamer Mecânico Low Profile RGB AW510K 580</h3>
              <p className="preco">R$ 1.002,00</p>
            </div>
            <div className="controle-quantidade">
              <button className="menos">-</button>
              <span className="quantidade">1</span>
              <button className="mais">+</button>
            </div>
          </div>

          <div className="item">
            <div className="imagem-item">
                <img src={ImgHeadSet}  />
            </div>
            <div className="detalhes-item">
              <h3>Headset Gamer RGB Preto</h3>
              <p className="preco">R$ 120,00</p>
            </div>
            <div className="controle-quantidade">
              <button className="menos">-</button>
              <span className="quantidade">1</span>
              <button className="mais">+</button>
            </div>
          </div>

          <div className="item">
            <div className="imagem-item">
                <img src={ImgPato}  />
            </div>
            <div className="detalhes-item">
              <h3>Pato?</h3>
              <p className="preco">R$ 1,40</p>
            </div>
            <div className="controle-quantidade">
              <button className="menos">-</button>
              <span className="quantidade">1</span>
              <button className="mais">+</button>
            </div>
          </div>
        </div>

        <div className="rodape">
          <div className="total">
            <span>Total:</span>
            <span className="valor-total">R$ 10.682,00</span>
          </div>
          <div className="cupom">
            <i className="fas fa-tag"></i>
            <span>Adicionar cupom</span>
          </div>
          <button className="finalizar-compra">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}