import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <Link class="navbar-brand me-2" to="/">
                        <h5 className="text-danger">
                            Online <span className="text-black">Bazaar</span>
                        </h5>
                    </Link>

                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarButtonsExample"
                        aria-controls="navbarButtonsExample"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>

                    <div
                        class="collapse navbar-collapse"
                        id="navbarButtonsExample"
                    >
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="#">
                                    Dashboard
                                </a>
                            </li>
                        </ul>

                        <div class="d-flex align-items-center">
                            <Link to={"/register"}>
                                <button
                                    type="button"
                                    class="btn btn-primary px-3 me-2"
                                >
                                    Register
                                </button>
                            </Link>
                            <Link to={"/login"}>Login</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
