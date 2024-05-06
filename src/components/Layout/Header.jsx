import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  const [auth, setAuth] = useAuth();

  // for handle logout remove token from localStorage
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top"> {/* Add sticky-top class */}
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse justify-content-between mx-5 navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand  " href="#">
            <TiShoppingCart className="text-primary  h2"/> <span className="text-xl font-weight-bold">BigBazaar</span>
            </Link>
            <ul className="navbar-nav  mb-2 mb-lg-0 me-4">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/category"
                  className="nav-link"
                  activeClassName="active"
                >
                  Category
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link"
                  activeClassName="active"
                >
                  Cart (0)
                </NavLink>
              </li>

              {/* User authentication And dropdown  */}

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      to="/register"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      activeClassName="active"
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu mt-2 ">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          activeClassName="active"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
             
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
