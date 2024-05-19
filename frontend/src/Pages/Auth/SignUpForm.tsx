import { Link, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"
import useForm from "../../hooks/useForm"
import { UserType, defaultStateType } from "../.."

const defaultState = {
    name: '',
    email: '',
    password: ""
}
const SignUpForm = () => {
    const navigate = useNavigate()
    const login = useAuthStore(state => state.handleLogin)
    const {
        data,
        errors,
        handleInputChange,
        handleSubmit,
    } = useForm<defaultStateType, UserType>({
        defaultState,
        submitUrl: '/api/users/register',
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
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center">Register</h3>
                        <div>
                            <label className="font-medium">
                                Name
                            </label>
                            <input
                                value={data.name}
                                name="name"
                                type="text"
                                onChange={handleInputChange}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-600 shadow-sm rounded-lg"
                            />
                            {errors?.name && <p>{errors.name}</p>}
                        </div>
                        <div>
                            <label className="font-medium">
                                Email
                            </label>
                            <input
                                name="email"
                                value={data.email}
                                type="email"
                                onChange={handleInputChange}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-600 shadow-sm rounded-lg"
                            />
                            {errors?.email && <p className="error">{errors.email}</p>}

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
                            {errors?.password && <p className="error">{errors.password}</p>}

                        </div>
                        <button type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
                        >
                            Register
                        </button>
                    </form>
                    <p className="mt-2 text-center text-sm">Already have an account?
                        <Link to='/sign-in' className="ml-1 font-medium text-orange-600 hover:text-orange-500">Log in
                        </Link>
                    </p>

                </div>
            </div >
        </main >

    )
}
export default SignUpForm