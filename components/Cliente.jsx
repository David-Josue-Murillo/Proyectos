import { space } from "postcss/lib/list";

function Cliente({ cliente }) {
  const { nombre, empresa, email, telefono } = cliente;

  return (
    <tr className="border-b">
      <td className="p-6">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <p>{empresa}</p>
      </td>

      <td>
        <p className="p-6">
            <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold">Email: </span> {email}</p>
        </p>
      </td>

      <td className="p-6 flex gap-3">
        <button
            type="button"
            className="text-blue-600 hover:text-blue-700 font-bold uppercase text-xs"
        >
            Editar
        </button>

        <button
            type="button"
            className="text-red-600 hover:text-red-700 font-bold uppercase text-xs"
        >
            Eliminar
        </button>
      </td>
    </tr>
  );
}

export default Cliente;
