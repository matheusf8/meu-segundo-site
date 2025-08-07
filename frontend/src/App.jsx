import { useState } from "react";
import { api } from "./config/api.js"; // Adicionar esta linha
import Login from "./component/Login";
import Cadastro from "./component/Cadastro";
import Principal from "./component/Principal";
import NovoRegistro from "./component/NovoRegistro";
import MeusRegistros from "./component/MeusRegistros";

function App() {
  const [pagina, setPagina] = useState("login");
  const [usuario, setUsuario] = useState(null);

  const handleLoginSucesso = (email) => {
    setUsuario({ email });
    setPagina("principal");
  };

  const sair = () => {
    setUsuario(null);
    setPagina("login");
  };

  return (
    <>
      {pagina === "login" && (
        <Login
          irParaCadastro={() => setPagina("cadastro")}
          loginSucesso={handleLoginSucesso}
          api={api} // Passar a API
        />
      )}
      {pagina === "cadastro" && (
        <Cadastro
          irParaLogin={() => setPagina("login")}
          api={api} // Passar a API
        />
      )}
      {pagina === "principal" && (
        <Principal usuario={usuario} sair={sair} setPagina={setPagina} />
      )}
      {pagina === "novoRegistro" && (
        <NovoRegistro
          usuario={usuario}
          voltar={() => setPagina("principal")}
          api={api} // Passar a API
        />
      )}
      {pagina === "meusRegistros" && (
        <MeusRegistros
          usuario={usuario}
          voltar={() => setPagina("principal")}
          api={api} // Passar a API
        />
      )}
    </>
  );
}

export default App;