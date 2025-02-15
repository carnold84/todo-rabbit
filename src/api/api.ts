import { v4 as uuidv4 } from "uuid";

import { AppState, Todo } from "../types";

const storageKey = "todo-rabbit";

const defaultState: AppState = {
  theme: "light",
  todos: [],
};

const saveData = (state: AppState) => {
  localStorage.setItem(storageKey, JSON.stringify(state));
};

export const getData = (): AppState => {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : defaultState;
};

export const addTodo = (todo: string) => {
  const state = getData();
  const newTodo = { completed: false, id: uuidv4(), order: 0, title: todo };
  const nextTodos = [...state.todos, newTodo];
  nextTodos.forEach((todo, i) => {
    todo.order = i;
  });
  state.todos = nextTodos;
  saveData(state);
  return newTodo;
};

export const getTodos = (): Todo[] => {
  return getData().todos;
};

export const removeTodo = (id: string) => {
  const state = getData();
  state.todos = state.todos.filter((todo) => todo.id !== id);
  saveData(state);
};

export const saveAllTodos = (todos: Todo[]) => {
  const state = getData();
  state.todos = todos.map((todo, i) => {
    return {
      ...todo,
      order: i,
    };
  });
  saveData(state);

  return state.todos;
};

export const toggleTodo = (id: string) => {
  const state = getData();
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;

    saveData(state);
  }
};

export const updateTheme = (theme: "light" | "dark") => {
  const state = getData();
  state.theme = theme;
  saveData(state);
};

export const updateTodo = (id: string, title: string) => {
  const state = getData();
  state.todos = state.todos.map((todo) => {
    if (todo.id === id) {
      todo.title = title;
    }
    return todo;
  });
  saveData(state);
};
