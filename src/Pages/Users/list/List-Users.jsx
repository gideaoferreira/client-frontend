import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Swal from "sweetalert2";
import {
  formatDateTime,
  formatDatePTBR,
  formatCpf,
} from "../../../utils/date-format.js";

function ListUsers() {
  const [listUsers, setListUsers] = useState([]);

  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setListUsers(response.data);
    } catch (error) {
      console.error(
        "Erro ao buscar usuários:",
        error.response?.data || error.message
      );
    }
  }

  function editUser(id) {
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
        axios.delete(`http://localhost:3000/user/${id}`).then((response) => {
          if (response.status == 201) {
            Swal.fire("Deletado!", "Usuário deletado com sucesso.", "success");
            getUsers();
          }
        });
      }
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
                <td>{formatDatePTBR(user.birthdate)}</td>
                <td>{formatCpf(user.cpf)}</td>
                <td>{user.email}</td>
                <td>
                  {user.status === "ACTIVE" && (
                    <span className="badge bg-success">Ativo</span>
                  )}
                  {user.status === "INACTIVE" && (
                    <span className="badge bg-secondary">Inativo</span>
                  )}
                  {user.status === "BLOCKED" && (
                    <span className="badge bg-danger">Bloqueado</span>
                  )}
                  {user.status === "ANALYSING" && (
                    <span className="badge bg-warning">Em análise</span>
                  )}
                </td>
                <td>{formatDateTime(user.createdAt)}</td>
                <td>
                  <div className="d-flex justify-content-end align-items-center gap-1">
                    <NavLink to={{ pathname: `/details-user/${user.id}` }}>
                      <button className="btn btn-secondary btn-sm">
                        Detalhes
                      </button>
                    </NavLink>

                    <button
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                      className="btn btn-danger btn-sm"
                    >
                      Deletar
                    </button>
                    <NavLink to={{ pathname: `/update-user/${user.id}` }}>
                      <button className="btn btn-warning btn-sm">Editar</button>
                    </NavLink>
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
