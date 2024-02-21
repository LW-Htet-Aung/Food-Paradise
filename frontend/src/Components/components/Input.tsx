import { InputProps } from "../.."
import _twMerge from "../../helpers/twMerge"
import { FC } from 'react'



const Input: FC<InputProps> = ({ name, className, ...rest }) => {
    return (
        <input
            name={name}
            className={_twMerge("border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5", className)}
            {...rest}
        />

    )
}
export default Input