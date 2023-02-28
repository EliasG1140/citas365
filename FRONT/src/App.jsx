import axios from 'axios';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LayoutMain from './components/LayoutMain';
import GestionCitas from './page/GestionCitas';
import Home from './page/Home';
import Income from './page/Income';
import MiHorario from './page/MiHorario';
import MisCitas from './page/MisCitas';
import SolicitarCitas from './page/SolicitarCitas';

function App() {
  axios.defaults.baseURL = 'http://192.168.1.6:3000/api/';

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Income/>}/>
        <Route path='/app' element={<LayoutMain/>}>
          <Route index element={<Home/>} />
          <Route path='solicitar-citas' element={<SolicitarCitas/>} />
          <Route path='mis-citas' element={<MisCitas/>} />
          <Route path='mi-horario' element={<MiHorario/>} />
          <Route path='gestion-citas' element={<GestionCitas/>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
