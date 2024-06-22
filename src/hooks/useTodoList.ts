import { useEffect, useState } from "react";

import { Todo } from "../types/todo";

export const useTodoList = () => {
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

  return {
    todoList,
    changeCompleted,
    addTodo,
    deleteTodo,
    deleteAllCompleted,
  };
}