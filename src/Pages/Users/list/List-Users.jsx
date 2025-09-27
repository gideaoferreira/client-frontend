import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

function ListUsers() {
  const [listUsers, setListUsers] = useState([]);

  async function getUsers() {
    await axios.get("http://localhost:3000/users").then((response) => {
      setListUsers(response.data);
      console.log(response.data);
    });
  }
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <div className="mt-3 d-flex justify-content-between align-items-center px-3">
        <h5>Usuários</h5>
        <NavLink to="/create-user">
          <button className="btn btn-primary btn-sm">+</button>
        </NavLink>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Nascimento</th>
            <th>CPF</th>
            <th>E-Mail</th>
            <th>Status</th>
            <th>Data de criação</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {listUsers.length === 0 ? (
            <tr>
              <td>Nenhum usuário encontrado.</td>
            </tr>
          ) : (
            listUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.birthdate}</td>
                <td>{user.cpf}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>{user.createdAt}</td>
                <td>
                  <div className="d-flex justify-content-end align-items-center gap-1">
                    <button className="btn btn-secondary btn-sm">
                      Detalhes
                    </button>
                    <button className="btn btn-danger btn-sm">Deletar</button>
                    <button className="btn btn-warning btn-sm">Editar</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default ListUsers;
