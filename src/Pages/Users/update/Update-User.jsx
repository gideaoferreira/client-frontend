import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

function UpdateUser() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  async function getUserById() {
    const userId = params.id;
    try {
      const response = await axios.get(`http://localhost:3000/user/${userId}`);
      if (response.status == 200) {
        setName(response.data.name);
        setSurname(response.data.surname);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setBirthdate(response.data.birthdate);
        setPassword(response.data.password);
        setStatus(response.data.status);
      }
    } catch (error) {
      console.error("Erro ao buscar usuario", error);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userId = params.id;
    const user = {
      name,
      surname,
      email,
      cpf,
      birthdate,
      password,
      status,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/user/${userId}`,
        user
      );
      if (response.status === 201) {
        Swal.fire("Editado!", "Usuário editado com sucesso.", "success");
        navigate("/users");
      }
    } catch (error) {
      console.error("Erro ao editar usuário", error);
      Swal.fire("Erro", "Não foi possivel editar o usuario", "error");
    }
  }

  useEffect(() => {
    getUserById();
  }, []);
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

        <h5 className="ps-5 mt-3">Editar usuário</h5>
      </div>

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
              Sobrenome
            </label>
            <input
              type="text"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              CPF
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(event) => setCpf(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Nascimento
            </label>
            <input
              type="date"
              value={birthdate}
              onChange={(event) => setBirthdate(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Status
              <select
                className="form-select"
                aria-label="Default select example"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option selected value="">
                  Selecione o status
                </option>
                <option value="ACTIVE">Ativo</option>
                <option value="INACTIVE">Inativo</option>
                <option value="ANALYSING">Em análise</option>
                <option value="BLOCKED">Bloqueado</option>
              </select>
            </label>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-success"
            >
              Editar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateUser;
