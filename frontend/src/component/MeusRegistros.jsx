import React, { useEffect, useState } from "react";
import "../estilos/folha-caderno.css";

function MeusRegistros({ usuario, voltar }) {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);
  const [novoTexto, setNovoTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/registros?email=${usuario.email}`)
      .then((res) => res.json())
      .then((data) => {
        setRegistros(data);
        setCarregando(false);
      });
  }, [usuario.email]);

  // Feedback desaparece após 2 segundos
  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => setMensagem(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  const editarRegistro = (registro) => {
    setEditando(registro.id);
    setNovoTexto(registro.texto);
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setNovoTexto("");
  };

  const salvarEdicao = async (reg) => {
    try {
      const resposta = await fetch(`http://127.0.0.1:8000/registro/${reg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: novoTexto }),
      });
      const data = await resposta.json();
      if (resposta.ok) {
        setMensagem(data.mensagem || "Registro salvo com sucesso!");
        setSucesso(true);
        setEditando(null);
        // Atualiza a lista
        setCarregando(true);
        fetch(`http://127.0.0.1:8000/registros?email=${usuario.email}`)
          .then((res) => res.json())
          .then((data) => {
            setRegistros(data);
            setCarregando(false);
          });
      } else {
        setMensagem("Erro ao salvar registro.");
        setSucesso(false);
      }
    } catch {
      setMensagem("Erro ao conectar ao servidor.");
      setSucesso(false);
    }
  };

  const excluirRegistro = async (registro) => {
    try {
      const resposta = await fetch(`http://127.0.0.1:8000/registro/${registro.id}`, {
        method: "DELETE",
      });
      const data = await resposta.json();
      setMensagem(data.mensagem || "Registro excluído com sucesso!");
      setSucesso(true);
      // Atualiza a lista
      setCarregando(true);
      fetch(`http://127.0.0.1:8000/registros?email=${usuario.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRegistros(data);
          setCarregando(false);
        });
    } catch {
      setMensagem("Erro ao conectar ao servidor.");
      setSucesso(false);
    }
  };

  return (
    <div className="folha-caderno">
      <h2>Meus Registros</h2>
      {carregando ? (
        <div style={{ color: "#e2c98f", textAlign: "center" }}>Carregando...</div>
      ) : registros.length === 0 ? (
        <div style={{ color: "#e2c98f", textAlign: "center" }}>Nenhum registro encontrado.</div>
      ) : (
        <div className="folha-lista-registros">
          <ul style={{ width: "100%", padding: 0, listStyle: "none" }}>
            {registros.map((reg, idx) => (
              <li key={reg.id || idx} style={{
                background: "#232526",
                border: "1px solid #e2c98f",
                borderRadius: "10px",
                color: "#ffe9b3",
                marginBottom: "12px",
                padding: "12px"
              }}>
                {editando === reg.id ? (
                  <>
                    <textarea
                      className="folha-textarea"
                      value={novoTexto}
                      onChange={e => setNovoTexto(e.target.value)}
                      style={{ marginBottom: "8px" }}
                    />
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button className="xp-btn" style={{ fontSize: "0.95rem", height: "32px", width: "80px" }} onClick={() => salvarEdicao(reg)}>
                        Salvar
                      </button>
                      <button className="xp-btn" style={{ fontSize: "0.95rem", height: "32px", width: "80px", background: "#a52a2a" }} onClick={cancelarEdicao}>
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "1rem", marginBottom: "6px" }}>{reg.texto}</div>
                    <div style={{ textAlign: "right", fontSize: "0.95rem", color: "#e2c98f" }}>{reg.data}</div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button className="xp-btn" style={{ fontSize: "0.9rem", height: "32px", width: "80px" }} onClick={() => editarRegistro(reg)}>
                        Editar
                      </button>
                      <button className="xp-btn" style={{ fontSize: "0.9rem", height: "32px", width: "80px", background: "#a52a2a" }} onClick={() => excluirRegistro(reg)}>
                        Excluir
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="xp-btn" onClick={voltar}>Voltar</button>
      {mensagem && (
        <div className={`folha-feedback ${sucesso ? "sucesso" : "erro"}`}>
          {mensagem}
        </div>
      )}
    </div>
  );
}

export default MeusRegistros;