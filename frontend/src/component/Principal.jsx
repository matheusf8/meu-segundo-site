import React from "react";
import "../estilos/folha-caderno.css";

function Principal({ usuario, sair, setPagina }) {
  return (
    <div className="xp-login-container">
      <div className="xp-login-box">
        <h2 className="xp-title">Bem-vindo(a) ao Meu Diário!</h2>
        <p className="welcome-message">
          Olá, <b>{usuario.email}</b>
        </p>
        <button
          className="xp-btn"
          style={{ marginBottom: "16px" }}
          onClick={() => setPagina("novoRegistro")}
        >
          Novo Registro
        </button>
        <button
          className="xp-btn"
          style={{ marginBottom: "16px" }}
          onClick={() => setPagina("meusRegistros")}
        >
          Meus Registros
        </button>
        <button className="xp-btn" onClick={sair}>
          Sair
        </button>
      </div>
    </div>
  );
}

export default Principal;