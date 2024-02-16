import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGastos, filtro, gastosFiltrados }) => {
    return (
        <div className='listado-gastos contenedor'>
            { filtro ? (
                <>
                    <h2>{gastosFiltrados.length ? 'Gastos' : 'No Hay Gastos en esta categoria'}</h2>
                    {gastosFiltrados.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGastos={eliminarGastos}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2>{gastos.length ? 'Gastos' : 'No Hay Gastos aún'}</h2>
                    {gastos.map(gasto => (
                        <Gasto
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGastos={eliminarGastos}
                        />
                    ))}
                </>
                )
            }
        </div>
    )
}

export default ListadoGastos