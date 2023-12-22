import Lottie from "lottie-react";
import registerLottie from '../../../public/Registation.json'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import usePublicAxios from "../../Hooks/usePublicAxios";
import GoogleLogin from "../Login/GoogleLogin";
import GithubLogin from "../Login/GithubLogin";



const Register = () => {
    const publicAxios = usePublicAxios()
    const navigate = useNavigate()
    const { createUser, userUpdateProfile } = useAuth()
    const IMG_IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY_IMGBB}`
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const imgFile = { image: data.image[0] }

        const res = await publicAxios.post(IMG_IMG_HOSTING, imgFile, {
            headers: { "content-type": "multipart/form-data" }
        })
        if (res.data.success) {
            console.log(data?.email, data?.password);
            createUser(data?.email, data?.password)
                .then(() => {
                    userUpdateProfile(data?.firstName, res.data?.data?.display_url)
                        .then(() => {
                            const userData = {
                                email: data?.email,
                                name: data?.firstName,
                            }
                            publicAxios.post('/user', userData)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        reset()
                                        navigate("/")
                                        Swal.fire({
                                            title: "registered successfully ",
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

                                    }
                                })

                        })
                        .catch(() => { })
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

    }


    return (
        <>

            <div className="hero min-h-screen w-full mx-auto bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:w-1/2 lg:text-left">
                        <Lottie className=" lg:ml-32 h-36 lg:h-2/6 w-10/12" animationData={registerLottie} loop={true} />
                    </div>
                    <div className="card md:w-11/10   max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("firstName", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.firstName?.type === "required" && (
                                    <p className=" text-red-400">First name is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Photo</span>
                                </label>
                                <input type="file" {...register("image", { required: true })} className="input-bordered" />
                                {errors.firstName?.type === "image" && (
                                    <p className=" text-red-400">photo is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", {
                                    required: true, minLength: 6, maxLength: 20,
                                    pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6}$/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "minLength" && (
                                    <p className=" text-red-400">password must be 6 character</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className=" text-red-400">password must 1 uppercase 1 lowercase or special character and number </p>
                                )}

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className="btn btn-primary bg-blue-800 " value="Register" />
                            </div>
                            <p>Already have a account. Please <Link to={"/login"}><span className=" text-blue-500">Login</span></Link></p>
                            <div className=" flex gap-5">
                                <GoogleLogin />
                                <GithubLogin />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;