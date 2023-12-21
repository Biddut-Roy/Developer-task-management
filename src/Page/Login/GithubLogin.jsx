import { FaGithub } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import usePublicAxios from "../../Hooks/usePublicAxios";

const GithubLogin = () => {
    const { githubEntry } = useAuth()
    const publicAxios = usePublicAxios()
    const navigate = useNavigate()
    let location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const path = location.pathname
    const parts = path.split("/");
    const pathName = parts.length > 1 ? parts[1] : null;

    const handelGithubLogin = () => {
        githubEntry()
            .then((result) => {
                const userData = {
                    name: result.user?.displayName,
                    email: result.user?.email

                }
                navigate(from, { replace: true });
                Swal.fire({
                    title: `${pathName} successfully `,
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
                publicAxios.put("/user", userData)
                .then(() => {

                    // if (result.data) {
                        
                    // }

                });

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