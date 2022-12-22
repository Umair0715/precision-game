import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ redirectPath='/?login=true' , children }) => {
   const { user } = useSelector(state => state.auth);
   if(user){
      return children;
   }
   return <Navigate to={redirectPath} replace />
}

export default ProtectedRoute