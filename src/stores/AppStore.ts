import { create } from 'zustand';
import {
  addTodo,
  getData,
  getTodos,
  removeTodo,
  toggleTodo,
  updateTodo,
} from '../api';
import { AppState, Todo } from '../types';

type Store = AppState & {
  addTodo: (todo: string) => void;
  getTodos: () => Todo[];
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, title: string) => void;
};

const useStore = create<Store>((set) => ({
  todos: getData().todos,
  theme: getData().theme,
  addTodo: (todo: string) => {
    const response = addTodo(todo);
    set((state) => {
      return {
        todos: [...state.todos, response],
      };
    });
  },
  getTodos: () => {
    return getTodos();
  },
  removeTodo: (id: string) => {
    removeTodo(id);
    set((state) => {
      return {
        todos: state.todos.filter((todo) => todo.id !== id),
      };
    });
  },
  toggleTodo: (id: string) => {
    toggleTodo(id);
    set((state) => {
      return {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    });
  },
  updateTodo: (id: string, title: string) => {
    updateTodo(id, title);
    set((state) => {
      return {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, title } : todo
        ),
      };
    });
  },
}));

export default useStore;
