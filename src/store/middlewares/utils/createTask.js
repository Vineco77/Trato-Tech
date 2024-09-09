import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export default async function createTask({
  fork,
  dispatch,
  search,
  action,
  loadingText,
  successText,
  erroText,
}) {
  toast({
    title: "Carregando",
    description: loadingText,
    status: "loading",
    duration: 2000,
    position: "top-right",
    isClosable: true,
  });
  const task = fork(async (api) => {
    await api.delay(1000);
    return await search;
  });

  const response = await task.result;

  if (response.status === "ok") {
    toast({
      title: "Sucesso!",
      description: successText,
      status: "success",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
    dispatch(action(response.value));
  }

  if (response.status === "rejected") {
    toast({
      title: "Erro",
      description: erroText,
      status: "error",
      duration: 2000,
      position: "top-right",
      isClosable: true,
    });
  }
  return response;
}
