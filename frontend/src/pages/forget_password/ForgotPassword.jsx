import { useState } from "react";
import { forgotPasswordApi } from "../../apis/Api";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        forgotPasswordApi({ email })
            .then((res) => {
                toast.success(res.data.msg);
            })
            .catch((err) => {
                toast.error("Something went wrong");
            });
    };

    return (
        <div className="container">
            <h1>Forget Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your email</label>
                <input type="email" className="form-control w-25" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary">
                    Send Password Reset Link
                </button>
            </form>
        </div>
    );
};
export default ForgotPassword;
