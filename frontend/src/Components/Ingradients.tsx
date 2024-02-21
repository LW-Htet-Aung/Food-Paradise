import { ClassType, IngradientsType } from ".."
import _twMerge from "../helpers/twMerge"

const Ingradients = ({ ingradients, className, handleRemove, canDelete }: IngradientsType & ClassType & { handleRemove?: (e: React.MouseEvent) => void, canDelete?: boolean }) => {

  if (ingradients?.length === 0) return null
  return (
    <div className={_twMerge("space-x-2 space-y-2", className)}>
      <span> Ingredients -</span>
      {!!ingradients?.length &&
        ingradients?.map((ingradient, i) => (
          <span
            key={i}
            className="bg-orange-400 relative text-white inline-block px-2 py-1 rounded text-sm">
            {ingradient}
            {canDelete ?
              <div
                data-id={i}
                onClick={handleRemove}
                className="absolute h-4 w-4 flex justify-center items-center -right-2 -top-2 bg-red-500 text-white rounded-full text-sm cursor-pointer">
                -
              </div>
              :
              null
            }
          </span>
        ))
      }
    </div >
  )
}
export default Ingradients