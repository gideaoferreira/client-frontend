import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

function CreateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      birthdate: null,
    },
  });

  const navigate = useNavigate();

  function onSubmit(data) {
    axios.post("http://localhost:3000/user", data).then((response) => {
      if (response.status == 201) {
        navigate("/users");
      }
    });
  }

  return (
    <>
      <h5 className="mt-3 ps-5">Criar Usuario</h5>

      <div className="card p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Nome
            </label>
            <input
              type="text"
              className="form-control"
              {...register("name", {
                required: "Nome do usuário é obrigatório",
                minLength: {
                  value: 2,
                  message: "Não há caracteres suficiente",
                },
                maxLength: {
                  value: 20,
                  message: "O nome informado excedeu o limite de caracteres",
                },
              })}
            />

            <span className="text-danger">{errors.name?.message}</span>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Sobrenome
            </label>
            <input
              type="text"
              className="form-control"
              {...register("surname", {
                required: "O sobrenome é obrigatório",
                minLength: {
                  value: 3,
                  message: "Não há caracteres suficiente",
                },
                maxLength: {
                  value: 20,
                  message:
                    "O sobrenome informado excedeu o limite de caracteres",
                },
              })}
            />
            <span className="text-danger">{errors.surname?.message}</span>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              CPF
            </label>
            <input
              type="text"
              className="form-control"
              {...register("cpf", {
                required: "CPF invalido",
                minLength: {
                  value: 11,
                  message: "CPF invalido",
                },

                maxLength: {
                  value: 11,
                  message: "CPF invalido",
                },
              })}
            />
            <span className="text-danger">{errors.cpf?.message}</span>
          </div>

          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Nascimento
            </label>
            <input
              type="date"
              max={"2009-01-01"}
              className="form-control"
              {...register("birthdate", {
                required: "Data invalida",
                maxLength: { value: 15, message: "Data invalida" },
                minLength: { value: 6, message: "Data invalida" },
              })}
            />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">
              Email
            </label>
            <input
              type="email"
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
            <label for="exampleFormControlInput1" className="form-label">
              Senha
            </label>
            <input
              type="password"
              className="form-control"
              i
              {...register("password", {
                required: true,
                maxLength: 15,
                minLength: 6,
              })}
            />

            <span className="text-danger">
              {errors.password && "Senha do usuário é obrigatório"}
            </span>
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
