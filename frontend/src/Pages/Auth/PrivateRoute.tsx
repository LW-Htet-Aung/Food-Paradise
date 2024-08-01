import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../../store/useAuthStore"
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const user = useAuthStore(state => state.user)
    const fetchCurrentUser = useAuthStore(state => state.fetchCurrentUser)
    const { isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: fetchCurrentUser,
        initialData: user, // Set initialData to avoid unnecessary loading if user is already in state
        staleTime: 5 * 60 * 1000,
    });
    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        user ? <Outlet /> : <Navigate to="/sign-in" />
    )
}
export default PrivateRoute