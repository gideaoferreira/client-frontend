import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

function CreateOrder() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");

  // Buscar usuários e produtos do backend
  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3000/users"),
          axios.get("http://localhost:3000/products"),
        ]);
        setUsers(usersRes.data);
        setProducts(productsRes.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Swal.fire("Erro", "Não foi possível carregar os dados.", "error");
      }
    }
    fetchData();
  }, []);

  // Enviar formulário
  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedUser || !selectedProduct) {
      Swal.fire("Aviso", "Selecione um usuário e um produto!", "warning");
      return;
    }

    try {
      await axios.post("http://localhost:3000/orders", {
        customer_id: selectedUser,
        product_id: selectedProduct,
      });

      Swal.fire("Sucesso!", "Ordem criada com sucesso!", "success");
      navigate("/orders");
    } catch (error) {
      console.error("Erro ao criar ordem:", error);
      Swal.fire("Erro", "Não foi possível criar a ordem.", "error");
    }
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
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
            <h3 className="card-title mb-4 text-center">Criar Nova Ordem</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Select de usuários */}
            <div className="mb-3">
              <label className="form-label">Usuário</label>
              <select
                className="form-select"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Selecione um usuário</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} {user.surname}
                  </option>
                ))}
              </select>
            </div>

            {/* Select de produtos */}
            <div className="mb-3">
              <label className="form-label">Produto</label>
              <select
                className="form-select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Selecione um produto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — R$ {product.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            {/* Botões */}
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/orders")}
              >
                Voltar
              </button>

              <button type="submit" className="btn btn-primary">
                Criar Ordem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder;
