import RecipeCard from "../Components/RecipeCard";
import Pagination from "../Components/components/Pagination";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import axios from '../helpers/axios'
import { CombineRecipeType } from "..";
import { isAxiosError } from "axios";

const Home = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`/api/recipes${page !== 1 ? '?page=' + page : ""}`)
      if (res?.status === 200) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
      // setRecipe(res.data)
      return res?.data
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error?.response?.data?.message)
      }
    }
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', page],
    queryFn: fetchRecipe,
  })

  const apiRequest = async (id: string) => {
    try {
      await axios.delete('/api/recipes/' + id)
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error?.response?.data?.message)
      }
    }
  }
  const { mutate } = useMutation({ mutationKey: ['recipes'], mutationFn: apiRequest })

  const handleDelete = useCallback((id: string) => {
    mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['recipes']
        })
        if (data?.recipes?.length === 1 && page > 1) {
          navigate('?page=' + (page - 1))
        }
      }
    })

  }, [mutate, navigate, page, data?.recipes, queryClient])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error?.message ?? 'Something Went Wrong'}</h2>
  }
  if (data?.recipes.length < 1) {
    return <h2>No Recipe To Show</h2>
  }
  return (
    <>
      <div className="grid md:grid-cols-3 gap-4 grid-cols-1" >
        {data?.recipes?.map((item: CombineRecipeType) => (
          <RecipeCard handleDelete={handleDelete} key={item?.id} recipe={item} />
        ))}
      </div >
      < Pagination page={page} links={data?.links} />
    </>
  )
}
export default Home