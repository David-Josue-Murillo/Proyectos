import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'
import Modal from './components/Modal';

function App() {
  
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEdirtar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEdirtar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);      
    }
  }, [gastoEdirtar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    if(filtro){
      // Filtrar gastos por categoria
      const gastosFiltrado = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrado)
    }
  }, [filtro])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGastos = (gasto) => {
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else{
      // Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)
    }, 500);
  }

  const eliminarGastos = (id) => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados); 
  }

  return (
    <>
        <div className={modal ? 'fijar' : ''}>
          <Header 
            gastos = {gastos}
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto}
            isValidPresupuesto = {isValidPresupuesto}
            setIsValidPresupuesto = {setIsValidPresupuesto}
            setGastos = {setGastos}
          />

          {isValidPresupuesto && (
            <>
              <main>
                <Filtros 
                  filtro = {filtro}
                  setFiltro = {setFiltro}
                />
                <ListadoGastos 
                  setGastoEditar = {setGastoEditar}
                  gastos = {gastos}
                  eliminarGastos = {eliminarGastos}
                  filtro = {filtro}
                  gastosFiltrados = {gastosFiltrados}
                />
              </main>
              <div className='nuevo-gasto'>
                <img 
                  src={IconoNuevoGasto}
                  alt='icono nuevo gasto'
                  onClick={handleNuevoGasto}
                />
              </div>
            </>
          )}

          {modal && 
            <Modal 
              setModal = {setModal}
              animarModal = {animarModal}
              setAnimarModal = {setAnimarModal}
              guardarGastos = {guardarGastos}
              gastoEdirtar = {gastoEdirtar}
              setGastoEditar = {setGastoEditar}
            />}

        </div>
    </>
  )
}

export default App
