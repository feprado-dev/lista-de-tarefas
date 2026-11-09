import { useState } from 'react';
import './TodoList.css';
import Icone from './assets/icon.webp';
import { useTasks } from './hooks/useTasks';

function TodoList() {
  const { lista, adicionar, alternarConclusao, remover, removerTodas } = useTasks();
  const [novoItem, setNovoItem] = useState('');

  function handleSubmit(form) {
    form.preventDefault();
    if (!adicionar(novoItem)) return;
    setNovoItem('');
    document.getElementById('input-entrada').focus();
  }

  function handleDeletarTodas() {
    if (window.confirm('Tem certeza de que deseja deletar todas as tarefas?')) {
      removerTodas();
    }
  }

  return (
    <main className="todo-app">
      <header className="todo-header">
        <p className="eyebrow">ORGANIZE SEU DIA</p>
        <h1>Lista de tarefas</h1>
        <p className="subtitle">Um passo de cada vez. Você consegue.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          id="input-entrada"
          type="text"
          placeholder="Adicione uma tarefa"
          aria-label="Nova tarefa"
          value={novoItem}
          onChange={(e) => setNovoItem(e.target.value)}
        />
        <button className="add" type="submit">Adicionar</button>
      </form>
      <div className="listaTarefas">
        {lista.length < 1 ? (
          <div className="empty-state">
            <img className="icone-central" src={Icone} alt="" />
            <p>Suas tarefas aparecerão aqui.</p>
          </div>
        ) : (
          lista.map((item) => (
            <div className={`item${item.iscompleted ? ' concluida' : ''}`} key={item.id}>
              <label className="item-check">
                <input
                  type="checkbox"
                  checked={item.iscompleted}
                  onChange={() => alternarConclusao(item.id)}
                />
                <span>{item.text}</span>
              </label>
              <button className="del" type="button" onClick={() => remover(item.id)}>Deletar</button>
            </div>
          ))
        )}
        <button
          className="deleteAll"
          type="button"
          onClick={handleDeletarTodas}
          disabled={lista.length === 0}
        >
          Deletar Todas
        </button>
      </div>
    </main>
  );
}

export default TodoList;
