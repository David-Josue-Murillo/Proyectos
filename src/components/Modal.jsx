import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGastos, gastoEdirtar, setGastoEditar }) => {

    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(() => {
        if( Object.keys(gastoEdirtar).length > 0){
            setNombre(gastoEdirtar.nombre)
            setCantidad(gastoEdirtar.cantidad)
            setCategoria(gastoEdirtar.categoria)
            setId(gastoEdirtar.id)
            setFecha(gastoEdirtar.fecha)
        }
    }, []);

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }

        guardarGastos({nombre, cantidad, categoria, fecha, id})
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBtn}
                    alt='Cerrar modal'
                    onClick={ocultarModal}
                />
            </div>

            <form 
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? "animar" : "cerrar"}`}>
                <legend>{gastoEdirtar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {mensaje &&  <Mensaje tipo="error">{mensaje}</Mensaje>}
                <div className='campo'>
                    <label htmlFor='nombre'>Nombre Gasto</label>

                    <input
                        id='nombre'
                        type='text'
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='cantidad'>Cantidad</label>

                    <input
                        id='cantidad'
                        type='number'
                        placeholder='Añade la cantidad del gasto: ej. 300'
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className='campo'>
                    <label htmlFor='categoria'>categoria</label>

                    <select
                        id='categoria'
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}
                    >
                        <option value="">Seleccione</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gasto Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input
                    type='submit'
                    value={gastoEdirtar.nombre ? 'Guardar Cambios' : 'Añadir Gastos'}
                />
            </form>
        </div>
    )
}

export default Modal