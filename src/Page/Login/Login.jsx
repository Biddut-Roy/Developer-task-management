import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";


const Login = () => {
    return (
        <div className=" w-11/12 mx-auto ">
            <GoogleLogin />
            <GithubLogin />
        </div>
    );
};

export default Login;