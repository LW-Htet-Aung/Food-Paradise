import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

const RestrictedRoute = () => {
    const user = useAuthStore(state => state.user)

    return (
        !user ? <Outlet /> : <Navigate to="/" />
    )
}
export default RestrictedRoute