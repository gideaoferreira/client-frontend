import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

function UpdateOrder() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  // Buscar usuários e produtos para os selects
  useEffect(() => {
    async function fetchUsers() {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    }
    async function fetchProducts() {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    }
    fetchUsers();
    fetchProducts();
  }, []);

  // Buscar ordem pelo id
  useEffect(() => {
    async function getOrderById() {
      try {
        const res = await axios.get(
          `http://localhost:3000/orders/${params.id}`
        );
        const order = res.data;
        setSelectedUser(order.customer_id);
        setSelectedProduct(order.product_id);
      } catch (error) {
        console.error("Erro ao buscar ordem", error);
      }
    }
    getOrderById();
  }, [params.id]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/orders/${params.id}`, {
        customer_id: selectedUser,
        product_id: selectedProduct,
      });
      Swal.fire("Editado!", "Ordem editada com sucesso.", "success");
      navigate("/orders");
    } catch (error) {
      console.error("Erro ao editar ordem", error);
      Swal.fire("Erro", "Não foi possível editar a ordem", "error");
    }
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <NavLink
          to="/orders"
          className="ms-3"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: ".25rem .5rem",
            fontSize: ".75rem",
            background: "none",
            border: "none",
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M685.248 104.704a64 64 0 0 1 0 90.496L368.448 512l316.8 316.8a64 64 0 0 1-90.496 90.496L232.704 557.248a64 64 0 0 1 0-90.496l362.048-362.048a64 64 0 0 1 90.496 0"
            />
          </svg>
        </NavLink>

        <h5 className="ps-5 mt-3">Editar ordem</h5>
      </div>

      <div className="card p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuário</label>
            <select
              className="form-select"
              value={selectedUser}
              onChange={(event) => setSelectedUser(event.target.value)}
            >
              <option value="">Selecione um usuário</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} {user.surname}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Produto</label>
            <select
              className="form-select"
              value={selectedProduct}
              onChange={(event) => setSelectedProduct(event.target.value)}
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — R$ {Number(product.price).toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              Editar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateOrder;
