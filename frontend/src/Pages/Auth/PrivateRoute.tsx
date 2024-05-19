import { useAuthStore } from "../../store/useAuthStore"
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const user = useAuthStore(state => state.user)
    return (
        user ? <Outlet /> : <Navigate to="/sign-in" />
    )
}
export default PrivateRoute