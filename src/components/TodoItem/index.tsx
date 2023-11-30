import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { editTodo, removeTodo } from "../../redux/tableSlice";
import { TodoType } from "../../types/types";
import TodoForm from "../TodoForm";
import "./TodoItem.scss";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const dispatch = useAppDispatch();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="todoItem">
      {isEdit ? (
        <TodoForm
          prevValue={todo.title}
          changeItem={(value, isComplete) => {
            dispatch(
              editTodo({
                userId: todo.userId,
                id: todo.id,
                title: value,
                completed:
                  isComplete !== undefined ? isComplete : todo.completed,
              })
            );
            setIsEdit(false);
          }}
          completed={todo.completed}
        />
      ) : (
        <div className="item">
          <div
            className={`title ${todo.completed ? "complete" : ""}`}
            title={todo.completed ? "COMPLETE" : "ACTIVE"}
          >
            {todo.title}
          </div>
          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="button"
            title="DELETE"
          >
            X
          </button>
          <button onClick={() => setIsEdit(true)} className="button">
            edit
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
