import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

function ListProducts() {
  const [listProducts, setListProducts] = useState([]);

  async function getProducts() {
    await axios.get("http://localhost:3000/products").then((response) => {
      setListProducts(response.data);
      console.log(response.data);
    });
  }

  function editProduct(id) {
    console.log(id);
  }

  function deleteUser(id) {
    Swal.fire({
      title: "Tem certeza que deseja deletar?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/products/${id}`)
          .then((response) => {
            if (response.status == 200) {
              Swal.fire(
                "Deletado!",
                "Usuário deletado com sucesso.",
                "success"
              );
              getProducts();
            }
          });
      }
    });
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="mt-3 d-flex justify-content-between align-items-center px-3">
        <h5>Lista de produtos</h5>
        <NavLink to="/create-product">
          <button className="btn btn-primary btn-sm">+</button>
        </NavLink>
      </div>
      <div className="list-products">
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listProducts.length == 0 ? (
              <tr>
                <td>Sem produtos</td>
              </tr>
            ) : (
              listProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td style={{ width: 75 }}>
                    <div className="d-flex justify-content-end gap-1 align-items-center">
                      <button className="btn btn-secondary btn-sm">
                        Detalhes
                      </button>
                      <button
                        onClick={() => {
                          deleteUser(product.id);
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        Deletar
                      </button>
                      <button className="btn btn-warning btn-sm">Editar</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ListProducts;
