import React, { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { setTodoData, todoData } from "./redux/tableSlice";

function App() {
  const todo = useAppSelector(todoData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTodoData());
  }, []);

  return (
    <div className="App">
      {todo.map((td) => (
        <div key={td.id}>{td.title}</div>
      ))}
    </div>
  );
}

export default App;
