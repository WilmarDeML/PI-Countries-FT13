import { Route, Routes } from 'react-router'
import './App.css'
import Home from './componentes/home/Home'
import Paises from './componentes/paises/Paises'
import DetallePais from './componentes/detallePais/DetallePais'
import CreaActividad from './componentes/actividadCultural/CreaActividad'

const App = () => (  
  <div className="App">
    <Routes>
      <Route exact path='' element={ <Home /> } />
      <Route exact path='countries' element={ <Paises /> } />
      <Route exact path='actividad' element={ <CreaActividad /> } />
      <Route exact path='countries/:id' element={ <DetallePais /> } />
    </Routes>
  </div>
)

export default App
