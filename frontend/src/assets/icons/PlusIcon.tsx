import { ClassType } from "../.."
import _twMerge from "../../helpers/twMerge"

const PlusIcon = ({ className }: ClassType) => {
    return (
        <svg
            className={_twMerge('w-8 h-8', className)}
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 6V18" stroke='currentColor' strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 12H18" stroke='currentColor' strokeLinecap="round" strokeLinejoin="round" />
        </svg >
    )
}
export default PlusIcon