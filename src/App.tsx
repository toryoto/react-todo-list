import { useState } from 'react';
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from './components/AddTodoForm';
import { dummyTodoList } from "./data/dummyTodoList";

function App() {
  const [todoList, setTodoList] = useState(dummyTodoList);

  const changeCompleted = (id: number) => {
    // prevTodoListには更新される前のtodoListが仮引数として保持される
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    });
  };

  const addTodo = (title: string) => {
    setTodoList((prevTodoList) => {
      const newTodo = {
        id: Date.now(),
        title,
        completed: false,
      };

      return [newTodo, ...prevTodoList];
    });
  };

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <AddTodoForm addTodo={addTodo} />
        <div className='rounded bg-slate-200 p-5'>
          <TodoList todoList={todoList} changeCompleted={changeCompleted} />
        </div>
      </div>
    </main>
  );
}

export default App;