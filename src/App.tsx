import './themes/light.css';
import './index.css';
import styles from './App.module.css';
import useStore from './AppStore';
import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import Todo from './components/Todo/Todo';
import { IconoirProvider } from 'iconoir-react';
const App = () => {
  const store = useStore();

  return (
    <IconoirProvider iconProps={{ height: 20, width: 20 }}>
      <div className={styles.root}>
        <div className={styles.container}>
          <header className={styles.header}>
            <AddTodoForm onSubmit={(text) => store.addTodo(text)} />
          </header>
          <main className={styles.content}>
            <ul className={styles.todo_list}>
              {store.todos.length === 0 && (
                <li className={styles.empty_message}>No todos</li>
              )}
              {store.todos.map((todo) => (
                <li key={todo.id}>
                  <Todo
                    id={todo.id}
                    isDone={todo.completed}
                    onClick={() => store.toggleTodo(todo.id)}
                    onRemoveClick={() => store.removeTodo(todo.id)}
                    onSave={() => store.updateTodo(todo.id, todo.title)}
                    text={todo.title}
                  />
                </li>
              ))}
            </ul>
          </main>
        </div>
      </div>
    </IconoirProvider>
  );
};

export default App;
