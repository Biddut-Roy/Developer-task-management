import { Outlet } from "react-router-dom";
import Footer from "../../Page/share page/Footer";


const Main = () => {
    return (
        <div>
            <div>
            <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;