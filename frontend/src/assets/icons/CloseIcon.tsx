import { ClassType } from "../.."
import _twMerge from "../../helpers/twMerge"

const CloseIcon = ({ className }: ClassType) => {
    return (
        <svg className={_twMerge('w-4 h-4', className)}
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            strokeWidth="1">

            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

            <g id="SVGRepo_iconCarrier">
                <path d="M6 6L18 18" stroke="currentColor" strokeLinecap="round" />
                <path d="M18 6L6.00001 18" stroke="currentColor" strokeLinecap="round" />
            </g>

        </svg>
    )
}
export default CloseIcon