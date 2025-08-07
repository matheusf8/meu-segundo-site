import React, { useState } from "react";
import { api } from '../config/api.js';  // ✅ ADICIONAR IMPORT
import "../estilos/folha-caderno.css";

function NovoRegistro({ usuario, voltar }) {
  const [texto, setTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const data = new Date();
  const dataFormatada = data.toLocaleDateString("pt-BR");

  const handleSalvar = async () => {
    if (!texto.trim()) {
      setMensagem("Escreva algo antes de salvar!");
      setSucesso(false);
      return;
    }
    
    try {
      // ✅ SUBSTITUIR por api.post
      const resposta = await api.post("/registro", {
        email: usuario.email,
        texto,
        data: dataFormatada,
      });
      
      // api.post já retorna JSON diretamente
      if (resposta) {
        setMensagem("Registro salvo com sucesso!");
        setSucesso(true);
        setTexto("");
      }
    } catch {
      setMensagem("Erro ao conectar ao servidor.");
      setSucesso(false);
    }
  };

  return (
    <div className="folha-caderno">
      <h2>Meu Registro</h2>
      <textarea
        className="folha-textarea"
        rows={12}
        placeholder="Escreva aqui o que está sentindo..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        aria-label="Campo de registro"
      />
      <div className="folha-data">{dataFormatada}</div>

      <div className="folha-botoes" style={{ width: "100%" }}>
        <button className="xp-btn" onClick={handleSalvar}>
          Salvar
        </button>
        <button className="xp-btn" onClick={voltar}>
          Voltar
        </button>
      </div>

      {mensagem && (
        <div className={`folha-feedback ${sucesso ? "sucesso" : "erro"}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default NovoRegistro;
