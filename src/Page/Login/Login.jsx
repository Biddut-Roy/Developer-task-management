import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";


const Login = () => {
    return (
        <div className=" w-11/12 min-h-screen mx-auto border-2 border-dashed border-cyan-700 ">
            <div className=" mt-16 ">
                <GoogleLogin />
                <GithubLogin />
            </div>
        </div>
    );
};

export default Login;