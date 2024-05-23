import axios from "./axios";
import { RecipeDType } from "..";

export const postData = async ({
  data,
  id,
}: {
  data: RecipeDType;
  id?: string;
}): Promise<RecipeDType> => {
  console.log(data, "data");
  const formData = new FormData();
  formData.append("photo", data.photo!);
  formData.append("title", data.title);
  formData.append("description", data.description!);
  formData.append("ingradients", JSON.stringify(data.ingradients!));

  const res = await axios.request({
    method: id ? "Patch" : "Post",
    url: id ? "/api/recipes/" + id : "/api/recipes",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const fetchRecipe = async (id: string | undefined) => {
  if (id) {
    const res = await axios.get("/api/recipes/" + id);
    return res.data;
  }
};
