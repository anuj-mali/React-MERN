import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'))

    // NOTE: Logout Function
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand me-2" to="/">
                        <h5 className="text-danger">
                            Online <span className="text-black">Bazaar</span>
                        </h5>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarButtonsExample"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Dashboard
                                </a>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center">

                            {/* NOTE: Check if Logged In */}
                            {
                                user ? (
                                    // NOTE: Profile Dropdown
                                    <>
                                        <div class="dropdown">
                                            <button
                                                class="btn btn-warning dropdown-toggle"
                                                type="button"
                                                id="dropdownMenuButton"
                                                data-mdb-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {user.fname}
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                {
                                                    user.isAdmin ? (
                                                        <li><Link class="dropdown-item" to={'/admin-dashboard'}>Admin Dashboard</Link></li>
                                                    ) :
                                                        (
                                                            <li><Link class="dropdown-item" to={'/profile'}>Profile</Link></li>
                                                        )
                                                }
                                                <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
                                            </ul>
                                        </div>
                                    </>
                                ) :
                                    (
                                        <>
                                            <Link to={"/register"}>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary px-3 me-2"
                                                >
                                                    Register
                                                </button>
                                            </Link>
                                            <Link to={"/login"}>Login</Link>
                                        </>

                                    )
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
