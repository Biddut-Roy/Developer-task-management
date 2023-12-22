import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import PropTypes from 'prop-types';
import Lottie from "lottie-react";
import loadings from '../../public/loading.json'


const PrivateRoute = ({children}) => {
    const location = useLocation()
    const { user , loading} = useContext(AuthContext)
    if (loading) {
        
        return<Lottie className=" mx-auto h-24 md:h-32 lg:h-96 w-10/12" animationData={loadings} loop={true} />
    }

    if (user) {
        return children
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default PrivateRoute;