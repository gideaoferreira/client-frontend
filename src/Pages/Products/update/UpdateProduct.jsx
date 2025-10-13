import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  async function getProductById() {
    const productId = params.id;
    try {
      const response = await axios.get(
        `http://localhost:3000/product/${productId}`
      );

      if (response.status == 200) {
        setName(response.data.name);
        setPrice(response.data.price);
        setBrand(response.data.brand);
        setStock(response.data.stock);
        setDescription(response.data.description);
      }
    } catch (error) {
      console.error("Erro ao buscar o produto", error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const productId = params.id;
    const product = {
      name,
      price,
      brand,
      stock,
      description,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/products/${productId}`,
        product
      );
      if (response.status === 200) {
        console.log("Status da resposta:", response.status);

        await Swal.fire("Editado!", "Produto editado com sucesso.", "success");
        navigate("/products");
      }
    } catch (error) {
      console.error("Erro ao editar o produto", error);
      Swal.fire("Erro", "Não foi possivel editar o produto", "error");
    }
  }

  useEffect(() => {
    getProductById();
  }, []);
  return (
    <>
      <h5 className="ps-5 mt-3">Editar produto</h5>
      <div className="card p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Preço
            </label>
            <input
              type="text"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Marca
            </label>
            <input
              type="text"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Estoque
            </label>
            <input
              type="text"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Descrição
            </label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="form-control"
            />
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

export default UpdateProduct;
