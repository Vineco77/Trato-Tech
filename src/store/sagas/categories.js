import { call, delay, put, takeLatest } from "redux-saga/effects";
import { addAllCategories, loadingCategories } from "store/reducers/categories";
import { createStandaloneToast } from "@chakra-ui/toast";
import categoriesServices from "services/categories";

const { toast } = createStandaloneToast();

function* watchCategories() {
  toast({
    title: "Carregando",
    description: "Carregando categorias!",
    status: "loading",
    duration: 2000,
    position: "top-right",
    isClosable: true,
  });
  try {
    yield delay(1000);
    const categories = yield call(categoriesServices.search);
    yield put(addAllCategories(categories));

    toast({
      title: "Sucesso!",
      description: "Categorias carregadas com sucesso!",
      status: "success",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  } catch (erro) {
    toast({
      title: "Erro",
      description: "Erro na busca de categorias",
      status: "error",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  }
}

export function* categoriesSaga() {
  const task = yield takeLatest(loadingCategories, watchCategories);
  yield takeLatest(addAllCategories, () => task.cancel());
}
