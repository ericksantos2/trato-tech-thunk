import { createListenerMiddleware } from '@reduxjs/toolkit';
import { carregarUmaCategoria } from 'store/reducers/categorias';
import criarTarefa from './utils/criarTarefa';
import itensService from 'services/itens';
import { adicionarItens } from 'store/reducers/itens';

export const itensListener = createListenerMiddleware();

itensListener.startListening({
  actionCreator: carregarUmaCategoria,
  effect: async (action, { fork, dispatch, unsubscribe, getState }) => {
    const nomeCategoria = action.payload;
    const resposta = await criarTarefa({
      fork,
      dispatch,
      action: adicionarItens,
      busca: () => itensService.buscarDeCategorias(nomeCategoria),
      textoCarregando: `Carregando itens da categoria ${nomeCategoria}`,
      textoSucesso: `Itens da categoria ${nomeCategoria} carregados com sucesso!`,
      textoErro: 'Erro na busca de itens',
    });
  },
});
