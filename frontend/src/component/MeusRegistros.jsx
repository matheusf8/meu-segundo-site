import React, { useEffect, useState } from "react";
import { api } from '../config/api.js';
import "../estilos/folha-caderno.css";

function MeusRegistros({ usuario, voltar }) {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [editando, setEditando] = useState(null);
  const [novoTexto, setNovoTexto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    api.get(`/registros?email=${usuario.email}`)
      .then((data) => {
        setRegistros(data);
        setCarregando(false);
      })
      .catch(() => {
        setMensagem("Erro ao carregar registros.");
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
      await api.put(`/registro/${reg.id}`, { texto: novoTexto });
      
      setMensagem("Registro salvo com sucesso!");
      setSucesso(true);
      setEditando(null);
      
      // Recarregar lista
      setCarregando(true);
      const data = await api.get(`/registros?email=${usuario.email}`);
      setRegistros(data);
      setCarregando(false);
    } catch {
      setMensagem("Erro ao salvar registro.");
      setSucesso(false);
    }
  };

  const excluirRegistro = async (registro) => {
    try {
      await api.delete(`/registro/${registro.id}`);
      
      setMensagem("Registro excluído com sucesso!");
      setSucesso(true);
      
      // Recarregar lista
      setCarregando(true);
      const data = await api.get(`/registros?email=${usuario.email}`);
      setRegistros(data);
      setCarregando(false);
    } catch {
      setMensagem("Erro ao conectar ao servidor.");
      setSucesso(false);
    }
  };

  return (
    <div className="folha-caderno" style={{ paddingTop: "50px" }}>
      <h2 style={{ marginTop: "0px", marginBottom: "20px" }}>Meus Registros</h2>
      
      {carregando ? (
        <p style={{ color: "#e2c98f", textAlign: "center" }}>Carregando...</p>
      ) : registros.length === 0 ? (
        <p style={{ color: "#e2c98f", textAlign: "center" }}>Nenhum registro encontrado.</p>
      ) : (
        <div className="folha-lista-registros">
          <ul style={{ width: "100%", padding: "0", listStyle: "none", margin: "0" }}>
            {registros.map((reg, idx) => (
              <li
                key={reg.id || idx}
                style={{
                  background: "#232526",
                  border: "1px solid #e2c98f",
                  borderRadius: "10px",
                  color: "#ffe9b3",
                  marginBottom: "12px",
                  padding: "12px",
                }}
              >
                {editando === reg.id ? (
                  <>
                    <textarea
                      className="folha-textarea"
                      value={novoTexto}
                      onChange={e => setNovoTexto(e.target.value)}
                    />
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button 
                        className="xp-btn"
                        style={{ fontSize: "0.9rem", height: "32px", width: "80px" }}
                        onClick={() => salvarEdicao(reg)}
                      >
                        Salvar
                      </button>
                      <button 
                        className="xp-btn"
                        style={{ 
                          fontSize: "0.9rem", 
                          height: "32px", 
                          width: "80px",
                          background: "#a52a2a"
                        }}
                        onClick={cancelarEdicao}
                      >
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: "1rem", marginBottom: "6px", lineHeight: "1.4" }}>
                      {reg.texto}
                    </div>
                    <div style={{ 
                      textAlign: "right", 
                      fontSize: "0.95rem", 
                      color: "#e2c98f",
                      marginBottom: "8px"
                    }}>
                      {reg.data}
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                      <button 
                        className="xp-btn"
                        style={{ fontSize: "0.9rem", height: "32px", width: "80px" }}
                        onClick={() => editarRegistro(reg)}
                      >
                        Editar
                      </button>
                      <button 
                        className="xp-btn"
                        style={{ 
                          fontSize: "0.9rem", 
                          height: "32px", 
                          width: "80px",
                          background: "#a52a2a"
                        }}
                        onClick={() => excluirRegistro(reg)}
                      >
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