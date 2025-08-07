import React, { useState } from "react";
import "../estilos/folha-caderno.css";
import { api } from '../config/api.js';

function Cadastro({ irParaLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    
    // ✅ VALIDAÇÃO MELHORADA
    if (senha.length !== 6) {
      setMensagem("A senha deve ter exatamente 6 dígitos!");
      return;
    }
    
    if (!/^\d{6}$/.test(senha)) {
      setMensagem("A senha deve conter apenas números!");
      return;
    }

    try {
      const resposta = await api.post("/cadastro", { email, senha });
      
      if (resposta.mensagem) {
        setMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => {
          irParaLogin();
        }, 2000);
      }
    } catch (error) {
      // ✅ MELHOR TRATAMENTO DE ERRO
      console.error("Erro no cadastro:", error);
      setMensagem(error.response?.data?.mensagem || "Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="xp-login-container">
      <div className="xp-login-box">
        <h2 className="xp-title">Meu Diário - Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="xp-form-group">
            <label className="xp-label">E-mail:</label>
            <input
              className="xp-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
            />
          </div>
          
          <div className="xp-form-group">
            <label className="xp-label">Senha (6 dígitos):</label>
            <input
              className="xp-input"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              maxLength={6}
              minLength={6}
              pattern="\d{6}"
              title="Digite exatamente 6 números"
              placeholder="000000"
            />
          </div>
          
          <button className="xp-btn" type="submit">Cadastrar</button>
          <button
            className="xp-btn"
            type="button"
            onClick={irParaLogin}
          >
            Voltar
          </button>
        </form>
        
        {mensagem && (
          <div className="xp-mensagem">
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cadastro;