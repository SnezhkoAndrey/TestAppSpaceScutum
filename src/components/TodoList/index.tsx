import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { postTodo, setTodoData, todoData } from "../../redux/tableSlice";
import Paginator from "../Paginator";
import TodoItem from "../TodoItem";
import TodoForm from "../TodoForm";
import "./TodoList.scss";

const TodoList = () => {
  const todo = useAppSelector(todoData);
  const dispatch = useAppDispatch();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  //the number of tokens that will be displayed on the page
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(setTodoData());
  }, [dispatch]);

  //   Calculate current items based on currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todo.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="todoList">
      <TodoForm
        prevValue=""
        changeItem={(value) => dispatch(postTodo(value))}
      />

      <Paginator
        currentPage={currentPage}
        setCurrentPage={(page) => setCurrentPage(page)}
        itemsPerPage={itemsPerPage}
      />

      {currentItems.map((td) => (
        <TodoItem key={td.id} todo={td} />
      ))}
    </div>
  );
};

export default TodoList;
