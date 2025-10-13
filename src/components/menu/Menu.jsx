import { NavLink } from "react-router";

function Menu() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="src\assets\images\navbar-logo.png"
              alt="Logo da empresa"
              width={50}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  aria-current="page"
                  href="#"
                >
                  Página Inicial
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users" href="#">
                  Usuarios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/list-products" href="#">
                  Produtos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders" href="#">
                  Ordens
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Menu;
