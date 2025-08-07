import React, { useState } from "react";
import { api } from '../config/api.js';
import "../estilos/folha-caderno.css";  /* ✅ TROCAR POR ESTE */

function Login({ irParaCadastro, loginSucesso }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.post("/login", { email, senha });
      
      // api.post já retorna JSON diretamente
      if (resposta.mensagem) {
        setMensagem(resposta.mensagem);
        setTimeout(() => {
          loginSucesso(email);
        }, 1500);
      }
    } catch (error) {
      setMensagem("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="xp-login-container">
      <div className="xp-login-box">
        <h2 className="xp-title">Meu Diário - Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="xp-form-group">
            <label>E-mail:</label>
            <input
              className="xp-input"    /* ✅ ADICIONAR CLASSE */
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="xp-form-group">
            <label>Senha:</label>
            <input
              className="xp-input"    /* ✅ ADICIONAR CLASSE */
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button className="xp-btn" type="submit">Entrar</button>
          <button
            className="xp-btn"
            type="button"
            style={{ marginTop: "8px" }}
            onClick={irParaCadastro}
          >
            Cadastrar
          </button>
        </form>
        {mensagem && (
          <div style={{ marginTop: "16px", color: "#2056a5", textAlign: "center" }}>
            {mensagem}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;