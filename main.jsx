import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCLiente, { action as nuevoCLienteAction } from "./pages/NuevoCLiente";
import EditarCliente, { loader as editarClienteLoader } from "./pages/EditarCliente";
import Index, { loader as loaderClientes } from "./pages/Index";
import ErrorBoundary from "./components/ErrorPage";
import { action as eliminarCliente } from "./components/Cliente";

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {  
            index: true, 
            element: <Index />, 
            loader: loaderClientes, 
            errorElement: <ErrorBoundary /> 
         },
         {
            path: "/clientes/nuevo",
            element: <NuevoCLiente />,
            action: nuevoCLienteAction,
            errorElement: <ErrorBoundary /> 
         },
         {
            path: "/clientes/:clientesId/editar",
            element: <EditarCliente />,
            loader: editarClienteLoader,
            errorElement: <ErrorBoundary />
         },
         {
            path: "/clientes/:clientesId/eliminar",
            action: eliminarCliente
         }
      ],
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
