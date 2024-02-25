import { useNavigate, Form, useActionData } from "react-router-dom"
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function action({ request }) {
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
}

const NuevoCLiente = () => {

   const errores = useActionData()
   const navigate = useNavigate()

   return (
      <>
         <h1 className="font-black text-4xl text-blue-900">CLientes</h1>
         <p className="mt-3">Llena todos los campos para registrar un nuevo cliente</p>

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
               <Formulario />

               <input
                  type="submit"
                  className="bg-blue-800 w-full p-3 text-white uppercase font-bold hover:bg-blue-700 cursor-pointer"
                  value={"Registrar Cliente"}
               />
            </Form>
         </div>
      </>
   )
}

export default NuevoCLiente
