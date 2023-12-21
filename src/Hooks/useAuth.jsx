import { useContext } from "react";
import { AuthContext } from "../Authprovider/Authprovider";




const useAuth = () => {
   const Auth = useContext(AuthContext)
   return(Auth)
};

export default useAuth;