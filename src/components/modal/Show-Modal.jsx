import React from "react";

function ShowModal({ show, user, onClose }) {
  if (!show || !user) return null; // se não tiver show ou user selecionado, não renderiza nada

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Cabeçalho */}
          <div className="modal-header">
            <h5 className="modal-title">Detalhes do Usuário</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Corpo do Modal */}
          <div className="modal-body">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Nome:</strong> {user.name} {user.surname}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
            <p>
              <strong>CPF:</strong> {user.cpf}
            </p>
            <p>
              <strong>Nascimento:</strong> {user.birthdate}
            </p>
            <p>
              <strong>Criado em:</strong> {user.createdAt}
            </p>
          </div>

          {/* Rodapé */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowModal;
