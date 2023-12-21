import { Outlet } from "react-router-dom";
import Footer from "../../Page/share page/Footer";
import Navbar from "../../Page/share page/Navbar";


const Main = () => {
    return (
        <div className=" w-11/12 mx-auto">
            <Navbar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;