import { Link, NavLink, useNavigate } from "react-router-dom"
import axios from '../helpers/axios'
import { useAuthStore } from "../store/useAuthStore"
const Navbar = () => {
    const navigate = useNavigate()
    const user = useAuthStore(state => state.user)
    const logout = useAuthStore(state => state.handleLogout)

    console.log(user, 'user')
    const handleLogout = async () => {
        try {
            const res = await axios.post('/api/users/logout');
            if (res.status === 200) {
                logout();
                navigate('sign-in')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className="px-6 py-4 fixed top-0 left-0 right-0 shadow-sm bg-white flex justify-between items-center">
            <div>
                <h1 className="font-semibold text-orange-500 tracking-wide text-2xl"> Foodie Paradise</h1>
            </div>
            <ul className="flex items-center space-x-5 ">
                <li>
                    <NavLink
                        className="navlink"
                        to='/'
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className='navlink'
                        to='about'
                    >
                        About
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className="navlink"
                        to='recipes/create'
                    >
                        Create Recipe
                    </NavLink>
                </li>
                {!user ? (<>
                    <li className="bg-orange-500 hover:bg-orange-400 text-white active:scale-95 transition-default cursor-pointer  text-wite rounded"
                    >
                        <Link className="px-3 py-2 block"
                            to='sign-in'
                        >
                            Login
                        </Link>
                    </li>
                    <li className="border border-orange-500 text-orange-500 hover:border-transparent hover:bg-orange-300 hover:text-slate-900 transition-default active:scale-95 transition-default cursor-pointer  text-wite rounded"
                    >
                        <Link className="px-3 py-2 block"
                            to='sign-up'
                        >
                            Register
                        </Link>
                    </li>
                </>) : (
                    <li className="bg-orange-500 hover:bg-orange-400 text-white active:scale-90 transition-default cursor-pointer  text-wite rounded"
                    >
                        <button onClick={handleLogout} className="px-3 py-2 block"
                        >
                            Logout
                        </button>
                    </li>)}

            </ul>
        </nav >
    )
}
export default Navbar