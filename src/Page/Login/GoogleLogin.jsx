import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth"
import toast, { Toaster } from "react-hot-toast";

const GoogleLogin = () => {
    const { googleEntry } = useAuth()
    const navigate = useNavigate()
    const handelGoogleLogin = () => {
        googleEntry()
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
    <div onClick={handelGoogleLogin} className="">
        <button className=" btn flex">
            <FcGoogle />
            Google
        </button>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </div>
);
};

export default GoogleLogin;