import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";


const Login = () => {
    return (
        <div className=" w-screen h-screen flex flex-col items-center justify-center gap-5 ">
            <GoogleLogin />
            <GithubLogin />
        </div>
   
    );
};

export default Login;