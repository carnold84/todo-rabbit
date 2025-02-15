import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle, Circle, Menu, Trash } from "iconoir-react";
import { FormEvent } from "react";

import styles from "./Todo.module.css";

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
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = formData.get("text") as string;
    onSave(id, text);
  };

  return (
    <div className={styles.root} ref={setNodeRef} style={style} {...attributes}>
      <div className={styles.handle} {...listeners}>
        <Menu />
      </div>
      <div className={styles.icon} onClick={() => onClick(id)}>
        {isDone ? <CheckCircle /> : <Circle />}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <input
          className={`${styles.textEdit} ${isDone ? styles.done : ""}`}
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
