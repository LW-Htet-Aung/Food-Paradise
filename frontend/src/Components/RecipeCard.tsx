import { useNavigate } from "react-router-dom";
import { formatDate } from "../helpers/date";
import Ingradients from "./Ingradients";
import { RecipeDateType, RecipeType } from "..";

const RecipeCard = ({ recipe, handleDelete }: { recipe: RecipeType & RecipeDateType, handleDelete: (id: string) => void, }) => {
    const navigate = useNavigate()
    return (
        <div className="bg-white p-5 rounded space-y-3">
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
    )
}
export default RecipeCard