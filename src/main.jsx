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
import ListUsers from "./Pages/Users/list/List-Users.jsx";
import CreateUser from "./Pages/Users/create/Create-User.jsx";
import UpdateUser from "./Pages/Users/update/Update-User.jsx";
import DetailsUser from "./Pages/Users/details/Details-User.jsx";
import ListOrders from "./Pages/Orders/ListOrders.jsx";
import DetailsProducts from "./Pages/Products/details/DetailsProducts.jsx";

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
        path: "/products",
        element: <ListProducts />,
      },

      {
        path: "/update-product/:id",
        element: <UpdateProduct />,
      },

      {
        path: "/details-product/:id",
        element: <DetailsProducts />,
      },

      {
        path: "/users",
        element: <ListUsers />,
      },

      {
        path: "/create-user",
        element: <CreateUser />,
      },

      {
        path: "/update-user/:id",
        element: <UpdateUser />,
      },

      {
        path: "/details-user/:id",
        element: <DetailsUser />,
      },

      {
        path: "/orders",
        element: <ListOrders />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
