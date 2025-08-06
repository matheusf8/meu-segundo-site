import React, { useState } from "react";
import "../estilos/login-xp.css";

function Cadastro({ irParaLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");
    if (senha.length !== 6) {
      setMensagem("A senha deve ter exatamente 6 dígitos!");
      return;
    }

    try {
      const resposta = await fetch("http://127.0.0.1:8000/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        setTimeout(() => {
          irParaLogin();
        }, 2000);
      } else {
        const erro = await resposta.json();
        setMensagem(erro.detail || "Erro ao cadastrar.");
      }
    } catch {
      setMensagem("Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="xp-login-container">
      <div className="xp-login-box">
        <h2 className="xp-title">Meu Diário - Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div className="xp-form-group">
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="xp-form-group">
            <label>Senha (6 dígitos):</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              maxLength={6}
              minLength={6}
              pattern="\d{6}"
              title="Digite exatamente 6 números"
            />
          </div>
          <button className="xp-btn" type="submit">Cadastrar</button>
          <button
            className="xp-btn"
            type="button"
            style={{ marginTop: "8px" }}
            onClick={irParaLogin}
          >
            Voltar
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

export default Cadastro;