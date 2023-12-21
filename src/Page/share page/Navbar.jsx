import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";



const Navbar = () => {

    const { user, logOut } = useAuth();

    const list = <>
        <li> <NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-blue-800" : ""} to={"/"}>Home</NavLink> </li>
        {
            user ?
                <li> <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-blue-800" : ""} to={"/dashboard"}>Dashboard</NavLink> </li>
                :
                <li> <NavLink className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "bg-blue-800" : ""} to={"/register"}>Register</NavLink> </li>
        }

        <li> <NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-blue-800" : ""} to={"/contact"}>Contact</NavLink> </li>
        
        <li> <NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-blue-800" : ""} to={"/services"}>Services</NavLink> </li>
        <li> <NavLink className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "bg-blue-800" : ""} to={"/gallery"}>Gallery</NavLink> </li>

    </>

    return (
        <div className="navbar bg-slate-400 text-black border-solid border-b-2 border-black mx-auto md:w-11/12 lg:w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm bg-gray-700 z-50 dropdown-content mt-3  p-2 shadow rounded-box w-52">
                        {list}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost normal-case text-xl"><img className=" w-10 h-10" src='/logo1.png' alt="Logo" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu  menu-horizontal px-1">
                    {list}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                <div className="hidden md:flex lg:flex">
                    <p>{user?.displayName}</p>
                </div>
                <div className=" w-10 h-10 hidden md:flex lg:flex ">
                    <img className=" rounded-full" src={user ? user?.photoURL : ``} alt="" />
                </div>

                {
                    user ?
                        <NavLink ><button onClick={() => logOut()} className=" btn btn-neutral bg-blue-800  btn-sm">Log out</button></NavLink>
                        :
                        <NavLink to={"/login"}><button className=" btn btn-primary bg-blue-800 btn-sm">Login</button></NavLink>

                }

            </div>
        </div>
    );
};

export default Navbar;