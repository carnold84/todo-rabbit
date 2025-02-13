import { useRef } from 'react';
import styles from './AddTodoForm.module.css';
import { Check } from 'iconoir-react';

interface AddTodoFormProps {
  onSubmit: (text: string) => void;
}

const AddTodoForm = ({ onSubmit: onFormSubmit, ...rest }: AddTodoFormProps) => {
  const elInput = useRef<HTMLInputElement>(null);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const text = elInput.current?.value;
    if (!text) return;
    elInput.current.value = '';

    onFormSubmit(text);
  };

  return (
    <form className={styles.root} onSubmit={onSubmit} {...rest}>
      <input
        className={styles.text_input}
        type="text"
        placeholder="Add task..."
        ref={elInput}
      />
      <button className={styles.submit_button} aria-label="Add">
        <Check />
      </button>
    </form>
  );
};

export default AddTodoForm;
