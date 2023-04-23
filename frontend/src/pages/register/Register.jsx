import React from "react";

const Register = () => {
    return (
        <div className="container">
            <h3>Register</h3>
            <div className="col-md-5">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="name">Firstname</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm"
                            id="confirm"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary form-control">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
