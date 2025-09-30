import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";

function CreateProduct() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const navigate = useNavigate();

  function onSubmit(data) {
    const formattedData = {
      ...data,
      price: parseFloat(data.price.replace(/\./g, "").replace(",", ".")),
      image: data.image || "https://via.placeholder.com/150",
    };

    axios
      .post("http://localhost:3000/products", formattedData)
      .then((response) => {
        if (response.status == 201) {
          navigate("/list-products");
        }
      });
  }
  return (
    <>
      <h5 className="mt-3 ps-5">Criar produto</h5>

      <div className="card p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Nome do produto
            </label>
            <input
              type="text"
              className="form-control"
              {...register("name", {
                required: "Nome do produto é obrigatório",
                minLength: {
                  value: 2,
                  message: "Não há caracteres suficiente",
                },
                maxLength: {
                  value: 30,
                  message: "O nome informado excedeu o limite de caracteres",
                },
              })}
            />

            <span className="text-danger">{errors.name?.message}</span>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Preço
            </label>

            <Controller
              name="price"
              control={control}
              rules={{ required: "O preço é obrigatório" }}
              render={({ field }) => (
                <CurrencyInput
                  decimalsLimit={2}
                  decimalSeparator=","
                  groupSeparator="."
                  prefix="R$ "
                  className="form-control"
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
            <span className="text-danger">{errors.price?.message}</span>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Marca
            </label>
            <input
              type="text"
              className="form-control"
              {...register("brand", {
                required: "A marca é obrigatória",
                minLength: { value: 2, message: "A marca é obrigatória" },
                maxLength: { value: 30, message: "A marca é obrigatória" },
              })}
            />
            <span className="text-danger">{errors.brand?.message}</span>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Estoque
            </label>
            <input
              type="text"
              className="form-control"
              {...register("stock", {
                required: "Quantidade insuficiente",
                max: { value: 999999, message: "Máximo 999999 unidades" },
                min: { value: 1, message: "Mínimo 1 unidade" },
              })}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Descrição
            </label>
            <input
              type="text"
              className="form-control"
              {...register("description", {
                required: "A descrição é obrigatória",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
                maxLength: { value: 200, message: "Máximo 200 caracteres" },
              })}
            />

            <span className="text-danger">{errors.description?.message}</span>
          </div>

          <div className="d-flex justify-content-end px-5">
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateProduct;
