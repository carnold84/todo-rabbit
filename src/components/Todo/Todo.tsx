import { FormEvent } from 'react';
import styles from './Todo.module.css';
import { CheckCircle, Circle, Trash } from 'iconoir-react';

interface TodoProps {
  id: string;
  isDone: boolean;
  onClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
  onSave: (id: string, text: string) => void;
  text: string;
}

const Todo = ({
  id,
  isDone,
  onClick,
  onRemoveClick,
  onSave,
  text,
}: TodoProps) => {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = formData.get('text') as string;
    onSave(id, text);
  };

  return (
    <div className={styles.root}>
      <div className={styles.icon} onClick={() => onClick(id)}>
        {isDone ? <CheckCircle /> : <Circle />}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={`${styles.textEdit} ${isDone ? styles.done : ''}`}
          defaultValue={text}
        />
      </form>
      <div className={styles.icon} onClick={() => onRemoveClick(id)}>
        <Trash />
      </div>
    </div>
  );
};

export default Todo;
