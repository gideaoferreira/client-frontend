import axios from "axios";
import { useParams } from "react-router";
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

  function getUserById() {
    const userId = params.id;
    axios.get(`http://localhost:3000/users/${userId}`).then((response) => {
      if (response.status == 200) {
        setName(response.data.name);
        setSurname(response.data.surname);
        setEmail(response.data.email);
        setCpf(response.data.cpf);
        setBirthdate(response.data.birthdate);
        setPassword(response.data.password);
        setStatus(response.data.status);
      }
    });
  }

  function handleSubmit() {
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

    axios.put(`http://localhost:3000/user/${userId}`).then((response) => {
      if ((response.status = 200)) {
        Swal.fire("Editado!", "Usuário editado com sucesso.", "success");
      }
    });
  }

  useEffect(() => {
    getUserById, [];
  });
  return (
    <>
      <h5 className="ps-5 mt-3">Editar usuário</h5>
      <div className="card p-5">
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
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            CPF
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Nascimento
          </label>
          <input type="date" className="form-control" />
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Email
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Status
          </label>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-success">Editar</button>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
