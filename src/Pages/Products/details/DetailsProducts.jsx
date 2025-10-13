import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useParams } from "react-router";

function DetailsProducts() {
  const { id } = useParams();
  const [product, setproduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setproduct(response.data);
      } catch (error) {
        console.error("Usuario nao encontrado", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Detalhes do produto</h5>

              <p>
                <strong>Nome:</strong> {product.name}
              </p>
              <p>
                <strong>Marca:</strong> {product.brand}
              </p>
              <p>
                <strong>Price:</strong> {product.price}
              </p>
              <p>
                <strong>Estoque</strong> {product.stock}
              </p>
              <p>
                <strong>Descrição</strong>
                {product.description}
              </p>

              <div className="d-flex justify-content-end">
                <NavLink to="/products">
                  <button href="#" className="btn btn-secondary">
                    Voltar
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsProducts;
