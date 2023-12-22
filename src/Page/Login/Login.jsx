import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";
import lock from "../../../public/lock.json"
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
    const { entryUser } = useAuth()
    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const handelLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        entryUser(email, password)
            .then(() => {
                Swal.fire({
                    title: "logIn successfully ",
                    showClass: {
                        popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                    },
                    hideClass: {
                        popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                    }
                });
                navigate(from, { replace: true });
            })
            .catch(() => { });
    }

    return (

        <div className="hero min-h-screen w-full mx-auto bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:w-1/2 lg:text-left">
                    <Lottie className=" lg:ml-28 h-36 md:h-44 lg:h-96 w-10/12" animationData={lock} loop={true} />
                </div>
                <div className="card md:w-11/12  max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handelLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-success bg-blue-800" value="Login" />
                        </div>
                        <p>You dont have a account. Please <Link to={"/register"}><span className=' text-blue-500'>Register</span></Link></p>
                        <div className=" flex gap-5">
                            <GoogleLogin />
                            <GithubLogin />
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
};

export default Login;