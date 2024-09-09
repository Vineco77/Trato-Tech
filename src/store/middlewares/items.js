import { createListenerMiddleware } from "@reduxjs/toolkit";
import itemsService from "services/items";
import { loadingOneCategory } from "store/reducers/categories";
import { addItems } from "store/reducers/items";
import createTask from "./utils/createTask";

export const itemsListenar = createListenerMiddleware();

itemsListenar.startListening({
  actionCreator: loadingOneCategory,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    const { items } = getState();

    if (items.length === 25) return unsubscribe();

    const categoryName = action.payload;

    const itemsLoaded = items.some((item) => item.categoru === categoryName);

    if (itemsLoaded) return;

    await createTask({
      fork,
      dispatch,
      action: addItems,
      search: () => itemsService.searchOfCategories(categoryName),
      loadingText: `Carregando itens da categoria ${categoryName}`,
      successText: `Itens da categoria ${categoryName} carregadas com sucesso!`,
      erroText: `Erro na busca de itens`,
    });
  },
});
