import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ gastos, presupuesto, setPresupuesto, setGastos, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado

        // Calcular porcentaje
        const nuevoPorcenatje = ((( presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);

        setDisponible(totalDisponible)
        setGastado(totalGastado)
        setTimeout(() => {
            setPorcentaje(nuevoPorcenatje)
        }, 1000);
    }, [gastos])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const respuesta = confirm('Desea eliminar el presupuesto y gastos?')

        if(respuesta){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastos: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto