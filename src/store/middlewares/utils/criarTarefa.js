import { createStandaloneToast } from '@chakra-ui/toast';

const { toast } = createStandaloneToast();

export default async function criarTarefa({
  fork,
  dispatch,
  action,
  busca,
  textoSucesso,
  textoErro,
  textoCarregando,
}) {
  toast({
    title: 'Carregando',
    description: textoCarregando,
    status: 'loading',
    duration: 2000,
    isClosable: true,
  });
  const tarefa = fork(async (api) => {
    await api.delay(500);
    return await busca();
  });

  const resposta = await tarefa.result;

  if (resposta.status === 'ok') {
    dispatch(action(resposta.value));
    toast({
      title: 'Sucesso!',
      description: textoSucesso,
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  } else if (resposta.status === 'rejected') {
    toast({
      title: 'Erro',
      description: textoErro,
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }

  return resposta
}
