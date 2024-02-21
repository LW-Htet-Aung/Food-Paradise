import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav className="px-6 py-4 fixed top-0 left-0 right-0 shadow-sm bg-white flex justify-between items-center">
            <div>
                <h1 className="font-semibold text-orange-500 tracking-wide text-2xl"> Foodie Paradise</h1>
            </div>
            <ul className="flex space-x-10 ">
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
            </ul>
        </nav >
    )
}
export default Navbar