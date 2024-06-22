import { useEffect, useState } from 'react';
import { TodoList } from "./components/TodoList";
import { AddTodoForm } from './components/AddTodoForm';
import { TodoSummary } from './components/TodoSummary';
import { Todo } from "./types/todo";

function App() {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const localStorageTodoList = localStorage.getItem('todoList');
    // ローカルストレージから取得した文字列を配列に変換
    return JSON.parse(localStorageTodoList ?? '[]');
  });

  // 第2引数のtodoListの値が更新されると発火
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

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

  // filterメソッドを使用して対象のidのTodoを除外
  const deleteTodo = (id: number) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => {
        return todo.id !== id;
      })
    })
  }

  const deleteAllCompleted = () => {
    setTodoList((prevTodoList) => {
      return prevTodoList.filter((todo) => {
        return !todo.completed;
      });
    });
  };

  return (
    <main className="mx-auto mt-10 max-w-xl space-y-10">
      <h1 className="text-center text-4xl">Todoアプリ</h1>
      <div className="space-y-5">
        <AddTodoForm addTodo={addTodo} />
        <div className='space-y-5 rounded bg-slate-200 p-5'>
          <TodoList todoList={todoList} changeCompleted={changeCompleted} deleteTodo={deleteTodo} />
          <TodoSummary deleteAllCompleted={deleteAllCompleted} />
        </div>
      </div>
    </main>
  );
}

export default App;