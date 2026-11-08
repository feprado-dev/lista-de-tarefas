import React, { useEffect, useState } from 'react';
import './TodoList.css';    
import Icone from './assets/icon.webp'

function carregarTarefas() {
    try {
        const tarefasSalvas = localStorage.getItem('listaTarefas');
        if (!tarefasSalvas) {
            return [];
        }

        const tarefas = JSON.parse(tarefasSalvas);
        if (!Array.isArray(tarefas)) {
            throw new TypeError('Os dados salvos não são uma lista de tarefas.');
        }

        return tarefas;
    } catch (erro) {
        console.error('Não foi possível carregar as tarefas do localStorage.', erro);
        return [];
    }
}

function TodoList(){

    const [lista, setLista] = useState(carregarTarefas);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem('listaTarefas', JSON.stringify(lista));
        } catch (erro) {
            console.error('Não foi possível salvar as tarefas no localStorage.', erro);
        }
    }, [lista]);

    function adicionarItem (form){
        form.preventDefault();
        if (!novoItem) {
            return;
        }
        setLista((tarefas) => [...tarefas, {id: Date.now(), text: novoItem, iscompleted: false}]);
        setNovoItem("");
        document.getElementById("input-entrada").focus();
    }

    function deletarItem(id) {
        setLista((tarefas) => tarefas.filter((item) => item.id !== id));
    }

    function deletarTodas() {
        if (window.confirm("Tem certeza de que deseja deletar todas as tarefas?")) {
            setLista([]);
        }
    }

    return (
    <main className="todo-app">
        <header className="todo-header">
            <p className="eyebrow">ORGANIZE SEU DIA</p>
            <h1>Lista de tarefas</h1>
            <p className="subtitle">Um passo de cada vez. Você consegue.</p>
        </header>
        <form onSubmit={adicionarItem}>
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
            {
                lista.length <1 
                    ?
                <div className="empty-state">
                    <img className="icone-central" src={Icone} alt="" />
                    <p>Suas tarefas aparecerão aqui.</p>
                </div>
                :
                lista.map((item) => (
                <div className="item" key={item.id}>
                <span>{item.text}</span>
                <button className="del" type="button" onClick={() => deletarItem(item.id)}>Deletar</button>
            </div>
            ))

                 
            }
                <button
                    className="deleteAll"
                    type="button"
                    onClick={deletarTodas}
                    disabled={lista.length === 0}
                >
                    Deletar Todas
                </button>
        </div>
    </main>
    
    
    )
}


export default TodoList;
