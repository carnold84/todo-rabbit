export type Todo = {
  completed: boolean;
  id: string;
  order: number;
  parentId?: string;
  title: string;
};

export type AppState = {
  theme: "light" | "dark";
  todos: Todo[];
};
