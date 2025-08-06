import React, { useState } from "react";
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
      const resposta = await fetch("http://127.0.0.1:8000/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: usuario.email,
          texto,
          data: dataFormatada,
        }),
      });
      if (resposta.ok) {
        setMensagem("Registro salvo com sucesso!");
        setSucesso(true);
        setTexto("");
      } else {
        setMensagem("Erro ao salvar registro.");
        setSucesso(false);
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
