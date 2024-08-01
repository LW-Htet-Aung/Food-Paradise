import Ingradients from "../../Components/Ingradients"
import Input from "../../Components/components/Input"
import PlusIcon from "../../assets/icons/PlusIcon"
import Error from "../../Components/components/Error"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { fetchRecipe, postData } from "../../helpers/recipe"
import { AxiosError } from "axios"
import { RecipeDType } from "../.."
import useFilePreview from "../../hooks/useFilePreview"
import Spinner from "../../Components/components/Spinner"

const defaultRecipe = {
    photo: "",
    title: '',
    description: '',
    ingradients: []
}
export interface EventHandler extends React.MouseEvent {
    dataset: Record<string, string>
}
const RecipeForm = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [ingradientInput, setIngradientInput] = useState('')
    const [data, setData] = useState<RecipeDType>(defaultRecipe)
    const queryClient = useQueryClient();

    const { preview, handleFileChange } = useFilePreview({
        data: data?.photo as string,
        callback: (file) => {
            setData((prev => ({ ...prev, photo: file })))
        }
    })
    const { data: recipeData, isLoading } = useQuery({
        queryKey: ['recipes', id],
        queryFn: () => fetchRecipe(id),
        gcTime: 0,
        enabled: !!id,
    })
    useEffect(() => {
        if (recipeData) {
            setData(recipeData)
        } else if (!id) {
            setData(defaultRecipe)
        }
    }, [recipeData, id])

    const { mutate, error, isPending } = useMutation<RecipeDType, AxiosError, { data: RecipeDType, id?: string }, unknown>({
        mutationKey: ['recipes'],
        mutationFn: postData,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['recipes']
            })
            navigate('/')
        }
    })
    const handleIngradientChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setIngradientInput(e.target.value)
    }, [])

    const handleAddIngradient = useCallback(() => {
        if (ingradientInput === '') return;
        setData(prev => ({ ...prev, ingradients: [...prev.ingradients, ingradientInput] }))
        setIngradientInput('')
    }, [ingradientInput])

    const handleSubmitRecipe = (e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        mutate({ data, id })
    }

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }, [])

    const handleRemove = useCallback((e: React.MouseEvent) => {
        const element = e.target as HTMLElement
        const ingradientId = element?.getAttribute('data-id')
        if (ingradientId) {
            setData((prev) => ({
                ...prev,
                ingradients: prev.ingradients.filter((_, i) => i !== +ingradientId)
            }))
        }
    }, [])
    if (id && isLoading) {
        return <h2>Loading...</h2>
    }
    return (
        <div key={id} className="mx-auto max-w-lg bg-white p-6 rounded ">
            <h1 className="text-orange-400 mb-4 text-center text-2xl font-semibold">{id ? 'Update' : 'Create'} Recipe Form</h1>
            <form onSubmit={handleSubmitRecipe} className="rounded space-y-6">
                <div>
                    {preview ? <img className="w-full h-[250px] object-contain rounded my-2" src={preview === data.photo ? `${import.meta.env.VITE_BACKEND_ASSET_URL}${data.photo}` : preview as string} /> : null}
                    <input
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md
                     file:border-0 file:text-sm file:font-semibold cursor-pointer file:cursor-pointer transition-default
                     file:bg-orange-50 file:text-orange-700
                     hover:file:bg-orange-100 mt-2 bg-slate-50 w-full rounded p-1"
                        onChange={handleFileChange}
                        name='photo'
                        type="file"
                    />
                </div>
                <div>

                    <Input
                        onChange={handleInputChange}
                        value={data?.title}
                        name='title'
                        type='text'
                        placeholder="Title"
                    />
                    <Error name='title' errors={error?.response?.data} />
                </div>
                <div>
                    <textarea
                        value={data?.description}
                        onChange={handleInputChange}
                        name='description'
                        className="w-full border border-gray-300 rounded p-2.5"
                        placeholder="Recipe Description"
                        rows={5}
                    />
                    <Error name='description' errors={error?.response?.data} />
                </div>
                <div>
                    <div className="flex space-x-2">
                        <Input
                            onChange={handleIngradientChange}
                            value={ingradientInput}
                            name='ingradients'
                            type='text'
                            placeholder="Ingradients"
                        />

                        <button
                            onClick={handleAddIngradient}
                            className="btn"
                            type="button"
                        >
                            <PlusIcon className="text-white" />
                        </button>
                    </div>
                    <Error name='ingradients' errors={error?.response?.data} />
                </div>
                <Ingradients canDelete handleRemove={handleRemove} className="w-fit" ingradients={data?.ingradients} />
                <button disabled={isPending || isLoading}
                    type="submit" className="btn w-full py-3 flex gap-3 items-center justify-center" >
                    {(isLoading || isPending) ? <Spinner /> : null}

                    {id ? 'Update' : 'Create'} Recipe
                </button>
            </form >
        </div >
    )
}
export default RecipeForm