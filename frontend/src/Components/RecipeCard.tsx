import { useNavigate } from "react-router-dom";
import { formatDate } from "../helpers/date";
import Ingradients from "./Ingradients";
import { RecipeDateType, RecipeType } from "..";
import imagePlaceholder from "../assets/icons/ImagePlaceholderIcon.svg";

const RecipeCard = ({ recipe, handleDelete }: { recipe: RecipeType & RecipeDateType, handleDelete: (id: string) => void, }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white rounded-md space-y-3 relative h-full">
            <img className={`w-full h-[200px] ${recipe.photo ? 'object-cover' : ''}  rounded-tl rounded-tr`} src={recipe.photo ? `http://localhost:4000${recipe.photo}` : imagePlaceholder} alt="" />
            <div className="px-4 pt-2 pb-4 space-y-2">
                <h3 className="text-xl font-bold text-orange-500">{recipe?.title}</h3>
                <p>Description</p>
                <p>{recipe?.description}</p>
                <Ingradients ingradients={recipe?.ingradients} />
                <p className="text-gray-600">Published at - {formatDate(recipe?.createdAt)}</p>
                <div className="space-x-4">
                    <button onClick={() => navigate('/recipes/edit/' + recipe?.id)} className="btn px-6 bg-sky-500">
                        Edit
                    </button>
                    <button onClick={() => handleDelete(recipe?.id)} className="btn px-6 bg-red-500">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
export default RecipeCard