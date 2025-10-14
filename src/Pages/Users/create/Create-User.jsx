import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      birthdate: "",
      status: "",
    },
  });

  const navigate = useNavigate();

  function onSubmit(data) {
    console.log("Dados enviados:", data);
    axios
      .post("http://localhost:3000/user", data)
      .then((response) => {
        if (response.status === 201) {
          navigate("/users");
        }
      })
      .catch((error) => {
        console.error(
          "Erro ao criar usuário:",
          error.response?.data || error.message
        );
      });
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <NavLink
          to="/users"
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

        <h5 className="mt-3 ps-5">Criar Usuário</h5>
      </div>

      <div className="card p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              {...register("name", {
                required: "Nome do usuário é obrigatório",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
                maxLength: { value: 20, message: "Máximo 20 caracteres" },
              })}
            />
            <span className="text-danger">{errors.name?.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Sobrenome
            </label>
            <input
              type="text"
              id="surname"
              className="form-control"
              {...register("surname", {
                required: "O sobrenome é obrigatório",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 20, message: "Máximo 20 caracteres" },
              })}
            />
            <span className="text-danger">{errors.surname?.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              className="form-control"
              {...register("cpf", {
                required: "CPF inválido",
                minLength: { value: 11, message: "CPF deve ter 11 caracteres" },
                maxLength: { value: 11, message: "CPF deve ter 11 caracteres" },
              })}
            />
            <span className="text-danger">{errors.cpf?.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="birthdate" className="form-label">
              Nascimento
            </label>
            <input
              type="date"
              id="birthdate"
              max="2009-01-01"
              className="form-control"
              {...register("birthdate", {
                required: "Data de nascimento é obrigatória",
              })}
            />
            <span className="text-danger">{errors.birthdate?.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Digite um email válido",
                },
              })}
            />
            <span className="text-danger">{errors.email?.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              {...register("password", {
                required: "Senha do usuário é obrigatória",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                maxLength: { value: 15, message: "Máximo 15 caracteres" },
              })}
            />
            <span className="text-danger">{errors.password?.message}</span>
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              {...register("status")}
              className="form-select"
              aria-label="Default select example"
            >
              <option selected value="">
                Selecione o status
              </option>
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
              <option value="ANALYSING">Em análise</option>
              <option value="BLOCKED">Bloqueado</option>
            </select>
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

export default CreateUser;
