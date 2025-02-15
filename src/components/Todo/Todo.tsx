import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Check,
  CheckCircle,
  Circle,
  Edit,
  EditPencil,
  Menu,
  Trash,
  Xmark,
} from "iconoir-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

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

  const [isEditing, setIsEditing] = useState(false);
  const formWrapperRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);
  const onCancelEdit = () => {
    setIsEditing(false);
  };
  useOnClickOutside(formWrapperRef, onCancelEdit);

  const onEdit = () => {
    setIsEditing(true);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const text = formData.get("text") as string;
    onSave(id, text);
    setIsEditing(false);
  };

  useEffect(() => {
    if (isEditing) {
      const input = textRef.current;

      if (input) {
        input.focus();
        const numChars = input.value.length;
        if (numChars) {
          input.setSelectionRange(numChars, numChars);
        }
      }
    }
  }, [isEditing]);

  return (
    <div className={styles.root} ref={setNodeRef} style={style} {...attributes}>
      <div className={styles.handle} {...listeners}>
        <Menu height="18" width="18" />
      </div>
      <div className={styles.icon_button} onClick={() => onClick(id)}>
        {isDone ? <CheckCircle /> : <Circle />}
      </div>
      {isEditing ? (
        <div
          className={`${styles.text_display} ${styles.text_edit} ${isDone ? styles.done : ""}`}
          ref={formWrapperRef}
        >
          <form className={styles.form} onSubmit={onSubmit}>
            <input
              className={`${styles.text_input} ${styles.text}`}
              defaultValue={text}
              name="text"
              ref={textRef}
            />
            <button className={styles.icon_button}>
              <Check />
            </button>
            <button
              className={styles.icon_button}
              onClick={onCancelEdit}
              type="button"
            >
              <Xmark />
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.text_display} onClick={onEdit}>
          <span className={`${styles.text} ${isDone ? styles.done : ""}`}>
            {text}
          </span>
          <button className={styles.icon_button} onClick={onEdit} type="button">
            <EditPencil />
          </button>
        </div>
      )}
      <button className={styles.icon_button} onClick={() => onRemoveClick(id)}>
        <Trash />
      </button>
    </div>
  );
};

export default Todo;
