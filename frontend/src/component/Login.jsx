import React, { useState } from "react";
import "../estilos/login-xp.css"; // Estilo inspirado no Windows XP

function Login({ irParaCadastro, loginSucesso }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem(""); // Limpa mensagem anterior

    try {
      const resposta = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        setMensagem(dados.mensagem || "Login realizado com sucesso!");
        setTimeout(() => {
          loginSucesso(email);
        }, 1500); // Redireciona após 1,5s
      } else {
        const erro = await resposta.json();
        setMensagem(erro.detail || "E-mail ou senha incorretos.");
      }
    } catch (err) {
      setMensagem("Erro ao conectar ao servidor.");
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="xp-form-group">
            <label>Senha:</label>
            <input
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