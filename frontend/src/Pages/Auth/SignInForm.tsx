import { Link, useNavigate } from "react-router-dom"
import useForm from "../../hooks/useForm";
import { useAuthStore } from "../../store/useAuthStore";
import { UserType, defaultStateType } from "../..";
const defaultState = {
    email: "",
    password: '',
}

const SignInForm = () => {
    const navigate = useNavigate()
    const login = useAuthStore(state => state.handleLogin)
    const {
        data,
        errors,
        handleInputChange,
        handleSubmit,
    } = useForm<Omit<defaultStateType, 'name'>, UserType>({
        defaultState,
        submitUrl: '/api/users/login',
        onSuccess: (data) => {
            login(data?.user)
            navigate('/')
        }
    });

    return (
        <main className="flex flex-col items-center justify-center  sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center">Login</h3>
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-600 shadow-sm rounded-lg"
                            />
                            {errors?.email || errors?.error && <p className="error">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="font-medium">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={handleInputChange}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-600 shadow-sm rounded-lg"
                            />

                            <Link to='/' className="text-right block text-sm mt-1 hover:text-orange-600">Forgot password?</Link>
                            {errors?.password && <p className="error">{errors.password}</p>}
                        </div>


                        <button type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
                        >
                            Login
                        </button>
                    </form>
                    <p className="mt-2 text-center text-sm">Don't have an account?
                        <Link to='/sign-up' className="ml-1 font-medium text-orange-600 hover:text-orange-500">Sign Up
                        </Link>
                    </p>

                </div>
            </div >
        </main >

    )
}
export default SignInForm