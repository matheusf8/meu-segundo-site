import { useState } from "react";
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
        />
      )}
      {pagina === "cadastro" && (
        <Cadastro irParaLogin={() => setPagina("login")} />
      )}
      {pagina === "principal" && (
        <Principal usuario={usuario} sair={sair} setPagina={setPagina} />
      )}
      {pagina === "novoRegistro" && (
        <NovoRegistro usuario={usuario} voltar={() => setPagina("principal")} />
      )}
      {pagina === "meusRegistros" && (
        <MeusRegistros usuario={usuario} voltar={() => setPagina("principal")} />
      )}
    </>
  );
}

export default App;