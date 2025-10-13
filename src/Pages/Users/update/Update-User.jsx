import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
      <h5 className="ps-5 mt-3">Editar usuário</h5>
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
