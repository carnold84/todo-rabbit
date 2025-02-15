import { IconoirProvider, LightBulb, LightBulbOff } from "iconoir-react";
import { useLayoutEffect } from "react";

import styles from "./App.module.css";
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";
import TodoList from "./containers/TodoList/TodoList";
import "./index.css";
import useStore from "./stores/AppStore";
import "./themes/dark.css";
import "./themes/light.css";

const body = document.body;

const App = () => {
  const store = useStore();

  const toggleTheme = () => {
    const currentTheme = store.theme;
    store.toggleTheme();

    body.classList.add(`${store.theme}_theme`);
    body.classList.remove(`${currentTheme}_theme`);
  };

  useLayoutEffect(() => {
    body.classList.add(`${store.theme}_theme`);
  }, [store.theme]);

  return (
    <IconoirProvider iconProps={{ height: 20, width: 20 }}>
      <div className={styles.root}>
        <div className={styles.container}>
          <header className={styles.header}>
            <AddTodoForm onSubmit={(text) => store.addTodo(text)} />
            <button className={styles.action_button} onClick={toggleTheme}>
              {store.theme === "light" ? <LightBulbOff /> : <LightBulb />}
            </button>
          </header>
          <main className={styles.content}>
            {store.todos.length === 0 && (
              <h4 className={styles.empty_message}>No todos</h4>
            )}
            <TodoList items={store.todos} />
          </main>
        </div>
      </div>
    </IconoirProvider>
  );
};

export default App;
