import { v4 as uuidv4 } from 'uuid';
import { AppState, Todo } from '../types';

const storageKey = 'todo-rabbit';

const defaultState: AppState = {
  theme: 'light',
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
  const newTodo = { id: uuidv4(), title: todo, completed: false };
  console.log(state);
  state.todos.push(newTodo);
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

export const toggleTodo = (id: string) => {
  const state = getData();
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;

    saveData(state);
  }
};

export const updateTheme = (theme: 'light' | 'dark') => {
  const state = getData();
  state.theme = theme;
  saveData(state);
};

export const updateTodo = (id: string, title: string) => {
  const state = getData();
  const todo = state.todos.find((todo) => todo.id === id);
  if (todo) {
    todo.title = title;
  }
};
