/* eslint-disable @typescript-eslint/no-explicit-any */
const Error = ({ name, errors }: { name: string, errors: any }) => {
    if (!errors) return null;
    return (
        <p className="block text-xs pl-2 mt-1 text-red-500" > {errors && errors[name] && errors[name]?.msg}</p >
    )
}
export default Error