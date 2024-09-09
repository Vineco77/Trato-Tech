import { createListenerMiddleware } from "@reduxjs/toolkit";
import categoriesServices from "services/categories";
import {
  addAllCategories,
  addOneCategories,
  loadingCategories,
  loadingOneCategory,
} from "store/reducers/categories";
import createTask from "./utils/createTask";

export const categoriesListener = createListenerMiddleware();

categoriesListener.startListening({
  actionCreator: loadingCategories,
  effect: async (action, { dispatch, fork, unsubscribe }) => {
    const response = await createTask({
      fork,
      dispatch,
      action: addAllCategories,
      search: categoriesServices.search,
      loadingText: "Carregando categorias!",
      successText: "Categorias carregadas com sucesso!",
      erroText: "Erro na busca de categorias",
    });
    if (response.status === "ok") {
      unsubscribe();
    }
  },
});

categoriesListener.startListening({
  actionCreator: loadingOneCategory,
  effect: async (action, { fork, dispatch, getState, unsubscribe }) => {
    const { categories } = getState();
    const categoryName = action.payload;
    const categoryLoaded = categories.some(
      (category) => category.id === categoryName
    );

    if (categoryLoaded) return;
    if (categories.length === 5) return unsubscribe();

    await createTask({
      fork,
      dispatch,
      action: addOneCategories,
      search: () => categoriesServices.searchOneCategory(categoryName),
      loadingText: `Carregando categoria ${categoryName}`,
      successText: `Categoria ${categoryName} carregada com sucesso!`,
      erroText: `Erro na busca da categoria ${categoryName}`,
    });
  },
});
