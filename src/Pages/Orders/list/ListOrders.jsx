import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function ListOrders() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const response = await axios.get("http://localhost:3000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Erro ao buscar ordens:", error);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function deleteOrder(id) {
    Swal.fire({
      title: "Tem certeza que deseja deletar?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/orders/${id}`
          );
          if (response.status === 200 || response.status === 204) {
            Swal.fire("Deletado!", "Ordem deletada com sucesso.", "success");
            fetchOrders();
          }
        } catch (error) {
          Swal.fire("Erro!", "Não foi possível deletar a ordem.", "error");
        }
      }
    });
  }

  return (
    <div className="p-4">
      <div className="mt-3 d-flex justify-content-between align-items-center px-3">
        <h5>Ordens de pedido</h5>
        <NavLink to="/create-order">
          <button className="btn btn-primary btn-sm">+</button>
        </NavLink>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID da Ordem</th>
            <th>Cliente</th>
            <th>Produto</th>
            <th>Preço</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {order.user ? `${order.user.name} ${order.user.surname}` : "—"}
              </td>
              <td>{order.product ? order.product.name : "—"}</td>
              <td>
                {order.product
                  ? `R$ ${Number(order.product.price).toFixed(2)}`
                  : "R$ —"}
              </td>
              <td>
                <button className="btn btn-secondary btn-sm me-2">
                  Detalhes
                </button>

                <button
                  onClick={() => deleteOrder(order.id)}
                  className="btn btn-danger btn-sm me-2"
                >
                  Deletar
                </button>
                <NavLink
                  to={{ pathname: `/update-order/${order.id}` }}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListOrders;
