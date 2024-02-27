import { Form, useNavigate, useLoaderData, redirect } from "react-router-dom"
import { obtenerCliente, actualizarCliente } from "../data/clientes"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({ params }) {
   const cliente = await obtenerCliente(params.clienteId)
   if (Object.values(cliente).length === 0) {
      throw new Response('', {
         status: 404,
         statusText: 'El cliente no fue encontrado'
      })
   }
   return cliente
}

export async function action({ request, params }) {
   const formData = await request.formData()
   const datos = Object.fromEntries(formData)
   const email = formData.get('email')

   // Validacion de datos
   const errores = []
   if (Object.values(datos).includes('')) {
      errores.push('Todos los campos son obligatorios')
   }

   let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
   if (!regex.test(email)) {
      errores.push('El email no es válido')
   }

   // Si hay errores
   if (Object.keys(errores).length) {
      return errores;
   }

   // Actualizar cliente
   await actualizarCliente(params.clienteId, datos)
   return redirect('/')
}


function EditarCliente() {
   const navigate = useNavigate()
   const cliente = useLoaderData()

   return (
      <>
         <h1 className="font-black text-4xl text-blue-900">Editar CLiente</h1>
         <p className="mt-3">A continuacióń podras modificar los datos de un cliente</p>

         <div className='flex justify-end'>
            <button
               type='button'
               className='bg-blue-800 text-white uppercase px-3 py-1'
               onClick={() => navigate(-1)}
            >
               Volver
            </button>
         </div>

         <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-5">

            {errores?.length && errores.map((error, index) => <Error key={index}>{errores}</Error>)}

            <Form
               method="post"
               noValidate
            >
               <Formulario
                  cliente={cliente}
               />

               <input
                  type="submit"
                  className="bg-blue-800 w-full p-3 text-white uppercase font-bold hover:bg-blue-700 cursor-pointer"
                  value="Guardar Cambios"              
               />
            </Form>
         </div>
      </>
   )
}

export default EditarCliente