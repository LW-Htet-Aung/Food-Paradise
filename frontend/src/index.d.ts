export type IngradientsType = {
  ingradients: string[];
};
export type RecipeDateType = {
  createdAt: string;
  updatedAt: string;
};

export type RecipeType = {
  photo: File | string | null;
  title: string;
  description: string;
  id: string;
} & IngradientsType;

export type CombineRecipeType = RecipeType & RecipeDateType;
export type RecipeDType = Omit<RecipeType, "id">;
export type ClassType = {
  className?: string;
};

export type InputProps = {
  name: string;
  value: string;
  rest?: unknown;
} & React.InputHTMLAttributes<HTMLInputElement> &
  ClassType;

export interface LinkType {
  nextPage: boolean;
  prevPage: boolean;
  currentPage: number;
  paginateLinks: PaginateLink[];
}

export interface PaginateLink {
  number: number;
}

export type defaultStateType = {
  name: string;
  email: string;
  password: string;
};
export type UserType = {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};
