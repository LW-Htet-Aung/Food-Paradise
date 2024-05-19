/* eslint-disable @typescript-eslint/no-unused-vars */
import Ingradients from "../../Components/Ingradients"
import Input from "../../Components/components/Input"
import PlusIcon from "../../assets/icons/PlusIcon"
import Error from "../../Components/components/Error"
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { fetchRecipe, postData } from "../../helpers/recipe"
import { AxiosError } from "axios"
import { RecipeDType } from "../.."

const defaultRecipe = {
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

    const { mutate, error } = useMutation<RecipeDType, AxiosError, { data: RecipeDType, id?: string }, unknown>({
        mutationKey: ['recipes'],
        mutationFn: postData,
        onSuccess: () => navigate('/')
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
        <div key={id} className="mx-auto max-w-md bg-white p-6 rounded ">
            <h1 className="text-orange-400 mb-4 text-center text-2xl font-semibold">{id ? 'Update' : 'Create'} Recipe Form</h1>
            <form onSubmit={handleSubmitRecipe} className="rounded space-y-6">
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
                <button type="submit" className="btn w-full">{id ? 'Update' : 'Create'} Recipe</button>
            </form >
        </div >
    )
}
export default RecipeForm