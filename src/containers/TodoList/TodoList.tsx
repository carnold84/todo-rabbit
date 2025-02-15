import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

import Todo from "../../components/Todo";
import useStore from "../../stores/AppStore";
import { Todo as TodoType } from "../../types";

const TodoList = ({ items: itemsProp }: { items: TodoType[] }) => {
  const store = useStore();
  const [items, setItems] = useState(itemsProp);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id && over) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const nextTodos = arrayMove(items, oldIndex, newIndex);

      store.saveAllTodos(nextTodos);

      setItems(nextTodos);
    }
  };

  useEffect(() => {
    setItems(itemsProp);
  }, [itemsProp]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(({ completed, id, title }) => (
          <Todo
            id={id}
            isDone={completed}
            key={id}
            onClick={() => store.toggleTodo(id)}
            onRemoveClick={() => store.removeTodo(id)}
            onSave={() => store.updateTodo(id, title)}
            text={title}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default TodoList;
