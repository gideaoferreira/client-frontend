import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout.jsx";
import Home from "./Pages/Home/Home.jsx";
import "bootstrap";
import CreateProduct from "./Pages/Products/create/CreateProduct.jsx";
import ListProducts from "./Pages/Products/list/ListProducts.jsx";
import UpdateProduct from "./Pages/Products/update/UpdateProduct.jsx";
import ListUsers from "./Pages/Users/list/list-users.jsx";
import CreateUser from "./Pages/Users/create/Create-User.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create-product",
        element: <CreateProduct />,
      },

      {
        path: "/list-products",
        element: <ListProducts />,
      },

      {
        path: "/update-product",
        element: <UpdateProduct />,
      },

      {
        path: "/users",
        element: <ListUsers />,
      },

      {
        path: "/create-user",
        element: <CreateUser />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
