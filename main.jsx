import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCLiente, {action as nuevoCLienteAction} from "./pages/NuevoCLiente";
import Index, { loader as loaderClientes } from "./pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Index />, loader: loaderClientes },
      {
        path: "/clientes/nuevo",
        element: <NuevoCLiente />,
        action: nuevoCLienteAction
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
