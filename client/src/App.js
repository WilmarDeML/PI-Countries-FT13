import { Route as Ruta } from 'react-router'
import './App.css'
import Home from './componentes/Home'
import Paises from './componentes/Paises'
import DetallePais from './componentes/DetallePais'
import CreaActividad from './componentes/CreaActividad'

const App = () => (  
  <div className="App">
    <Ruta exact path='/' component={Home} />
    <Ruta exact path='/countries' component={Paises} />
    <Ruta exact path='/actividad' component={CreaActividad} />
    <Ruta exact path='/countries/:id' component={DetallePais} />
  </div>
)

export default App
