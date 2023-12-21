import { FaGithub } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const GithubLogin = () => {
    const { githubEntry } = useAuth()
    const navigate = useNavigate()
    const handelGithubLogin = () => {
        githubEntry()
            .then((result) => {
                const userData = {
                    name: result.user?.displayName,
                    email: result.user?.email

                }
                console.log(result);
                navigate("/");
                toast.success('Successfully Login')

    })
}
    return (
        <div onClick={handelGithubLogin} className="">
            <button className=" btn flex">
                <FaGithub />
                GitHub
            </button>
        </div>
    );
};

export default GithubLogin;