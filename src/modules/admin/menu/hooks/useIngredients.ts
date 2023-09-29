import {
  activateAllIngredients,
  createIngredient,
  deleteIngredientById,
  getAllIngredients,
  updateIngredientById,
  type GetAllIngredientsResponse,
} from "@/modules/services/ingredients";
import { queryClient } from "@/pages/_app";
import { useMutation, useQuery } from "@tanstack/react-query";

export type Ingredient = GetAllIngredientsResponse[number];


export const useCreateIngredient = () => {
  return useMutation({
    mutationFn: createIngredient,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllIngredients"]);
    },
  });
};

export const useAllIngredients = () => {
  return useQuery({
    queryKey: ["useAllIngredients"],
    queryFn: () => getAllIngredients(),
  });
};

export const useUpdateIngredient = () => {
  return useMutation({
    mutationFn: updateIngredientById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllIngredients"]);
    },
  });
};

export const useActivateAllIngredients = () => {
  return useMutation({
    mutationFn: activateAllIngredients,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllIngredients"]);
    },
  });
};

export const useDeleteIngredient = () => {
  return useMutation({
    mutationFn: deleteIngredientById,
    onSuccess: () => {
      void queryClient.invalidateQueries(["useAllIngredients"]);
    },
  });
};
