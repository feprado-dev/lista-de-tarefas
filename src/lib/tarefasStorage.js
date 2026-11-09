// Única camada que conhece o armazenamento. Para trocar por API REST,
// substitua apenas estas duas funções mantendo a mesma assinatura.
const CHAVE = 'listaTarefas';

export function carregarTarefas() {
  try {
    const salvas = localStorage.getItem(CHAVE);
    if (!salvas) return [];

    const tarefas = JSON.parse(salvas);
    if (!Array.isArray(tarefas)) {
      throw new TypeError('Os dados salvos não são uma lista de tarefas.');
    }
    return tarefas;
  } catch (erro) {
    console.error('Não foi possível carregar as tarefas do localStorage.', erro);
    return [];
  }
}

export function salvarTarefas(tarefas) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(tarefas));
  } catch (erro) {
    console.error('Não foi possível salvar as tarefas no localStorage.', erro);
  }
}
