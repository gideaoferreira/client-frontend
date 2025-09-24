import { useState, useEffect } from "react";
import axios from "axios";

function ListProducts() {
  const [listProducts, setListProducts] = useState([]);

  async function getProducts() {
    await axios.get("http://localhost:3000/products").then((response) => {
      setListProducts(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="list-products">
        <table className="table table-striped">
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
                      <button className="btn btn-danger btn-sm">Deletar</button>
                      <button className="btn btn-primary btn-sm">Editar</button>
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
