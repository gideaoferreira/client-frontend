import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { useParams } from "react-router";
import {
  formatCpf,
  formatDatePTBR,
  formatDateTime,
} from "../../../utils/date-format.js";

function DetailsUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error("Usuario nao encontrado", error);
      }
    }

    fetchUser();
  }, [id]);

  if (!user) return <p>Carregando...</p>;

  return (
    <>
      <div className="row d-flex justify-content-center mt-5">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Detalhes do usúario</h5>

              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Sobrenome:</strong> {user.surname}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>CPF:</strong> {formatCpf(user.cpf)}
              </p>
              <p>
                <strong>Data de nascimento:</strong>{" "}
                {formatDatePTBR(user.birthdate)}
              </p>
              <p>
                <strong>Status:</strong>{" "}
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
              </p>

              <div className="d-flex justify-content-end">
                <NavLink to="/users">
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

export default DetailsUser;
