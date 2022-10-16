import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../Model/Model";
import "./SingleTodo.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<Boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const HandleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  const inputref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputref.current?.focus();
  }, [edit]);

  return (
    <form className="todos__single" onSubmit={(e) => HandleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputref}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__Single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__Single--text">{todo.todo}</s>
      ) : (
        <span className="todos__Single--text">{todo.todo}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
