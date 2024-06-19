import { useState } from 'react';
import { TodoList } from "./components/TodoList";
import { dummyTodoList } from "./data/dummyTodoList";

function App() {
  const [todoList, setTodoList] = useState(dummyTodoList);

  const changeCompleted = (id: number) => {
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

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="rounded bg-slate-200 p-5">
        <TodoList todoList={todoList} changeCompleted={changeCompleted} />
      </div>
    </main>
  );
}

export default App;