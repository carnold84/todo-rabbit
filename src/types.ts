export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type AppState = {
  theme: 'light' | 'dark';
  todos: Todo[];
};
