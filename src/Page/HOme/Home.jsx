import { Link } from "react-router-dom";


const Home = () => {
    return (
        <div>
            <div className="relative w-full">
                <img className="w-full" src="https://i.ibb.co/tMSBjyq/banner.jpg" alt="" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Link to={"/dashboard"}><button className="btn hover:bg-blue-800 ">Let’s Explore</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;