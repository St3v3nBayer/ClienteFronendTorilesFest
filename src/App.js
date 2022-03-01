import { useContext } from 'react';
import './App.css';
import AuthContext from './context/AuthContext';
import AdminRouter from './routers/AdminRouter';
import EmpleadoRouter from './routers/EmpleadoRouter';
import PublicRouter from './routers/PublicRouter';

function App() {

  //Contextos
  const { auth, usuario } = useContext(AuthContext);

  return (
    <div className="App">
      {(() => {
        if (auth) {
          if (usuario.rol === 1) { return <AdminRouter /> }
          else if (usuario.rol === 2) { return <EmpleadoRouter /> }
          else if (usuario.rol === 3) { return <h3>rol 3</h3> }
        } else { return <PublicRouter /> }
      })()}
    </div>
  );
}

export default App;
