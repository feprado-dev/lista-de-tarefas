import { useCallback, useEffect, useState } from 'react';
import { carregarTarefas, salvarTarefas } from '../lib/tarefasStorage';

export function useTasks() {
  const [lista, setLista] = useState(carregarTarefas);

  useEffect(() => {
    salvarTarefas(lista);
  }, [lista]);

  const adicionar = useCallback((texto) => {
    const limpo = texto.trim();
    if (!limpo) return false;
    setLista((tarefas) => [...tarefas, { id: Date.now(), text: limpo, iscompleted: false }]);
    return true;
  }, []);

  const remover = useCallback((id) => {
    setLista((tarefas) => tarefas.filter((item) => item.id !== id));
  }, []);

  const removerTodas = useCallback(() => setLista([]), []);

  return { lista, adicionar, remover, removerTodas };
}
