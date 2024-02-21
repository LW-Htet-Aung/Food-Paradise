/* eslint-disable @typescript-eslint/no-unused-vars */
import RecipeCard from "../Components/RecipeCard";
import axios from "axios"
import Pagination from "../Components/components/Pagination";
import { useMutation, useQuery } from "@tanstack/react-query"
import { RecipeType } from "..";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";



const Home = () => {
  const [recipe, setRecipe] = useState([])
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const navigate = useNavigate()

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/api/recipes${page !== 1 ? '?page=' + page : ""}`)
      if (res?.status === 200) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
      }
      return res?.data
    } catch (error) {
      console.log(error)
    }
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['recipes', page],
    queryFn: fetchRecipe,

  })
  useEffect(() => {
    setRecipe(data?.data)
  }, [data])

  const apiRequest = async (id: string) => {
    try {
      await axios.delete('http://localhost:4000/api/recipes/' + id)
    } catch (error) {
      console.log(error)
    }
  }
  const { mutate } = useMutation({ mutationKey: ['recipes'], mutationFn: apiRequest })

  const handleDelete = useCallback((id: string) => {
    mutate(id, {
      onSuccess: () => {
        if (recipe?.length === 1 && page > 1) {
          navigate('?page=' + (page - 1))
        } else {
          setRecipe((prev) => prev.filter((item: RecipeType) => item?.id !== id))
        }
      }
    })

  }, [mutate, navigate, page, recipe])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>Something Went Wrong</h2>
  }

  return (
    <div className="space-y-3" >
      {recipe?.length > 0 ? recipe?.map((item: RecipeType) => (
        <RecipeCard handleDelete={handleDelete} key={item?.id} recipe={item} />
      )) :
        <h2>No Recipe To Show</h2>
      }
      < Pagination page={page} links={data?.links} />
    </div >
  )
}
export default Home