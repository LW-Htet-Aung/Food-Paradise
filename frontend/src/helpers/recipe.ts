import axios from "./axios";
import { RecipeDType } from "..";

export const postData = async ({
  data,
  id,
}: {
  data: RecipeDType;
  id?: string;
}): Promise<RecipeDType> => {
  const res = await axios.request({
    method: id ? "Patch" : "Post",
    url: id ? "/api/recipes/" + id : "/api/recipes",
    data,
  });
  return res.data;
};

export const fetchRecipe = async (id: string | undefined) => {
  if (id) {
    const res = await axios.get("/api/recipes/" + id);
    return res.data;
  }
};
