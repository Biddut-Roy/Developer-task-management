import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";


const Profile = () => {
    const { user } = useAuth();


    return (
        <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">

            <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="border-b px-4 pb-6">
                    <div className="text-center my-4">
                        <img className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                            src={user ? user?.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt="photo" />
                        <div className="py-2">
                            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">{user?.displayName}</h3>
                            <div className="inline-flex text-gray-700 dark:text-gray-300 items-center">

                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 px-2">
                        <Link to={'/contact'} className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white dark:text-white antialiased font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
                            <button>
                                Contact
                            </button>
                        </Link>
                        <Link to={'/dashboard/task'} className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
                            <button >
                                All Task
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="px-4 py-4">
                    <div className="flex gap-2 items-center text-gray-800 dark:text-gray-300 mb-4">
                        <Link to={"/"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Profile;


