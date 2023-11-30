import { useState } from "react";
import "./TodoForm.scss";

interface PropsType {
  prevValue: string;
  changeItem: (value: string, complete?: boolean) => void;
  completed?: boolean;
}

const TodoForm = ({ prevValue, changeItem, completed }: PropsType) => {
  const [inputValue, setInputValue] = useState(prevValue);
  const [isDone, setIsDone] = useState(completed);

  // Function to handle value change
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    return setInputValue(e.currentTarget.value);
  };

  // Function to handle submit a new todo or changes to an existing one
  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    changeItem(inputValue, isDone);
    setInputValue("");
  };
  return (
    <form onSubmit={handleSubmit} className="formContainer">
      <input
        value={inputValue}
        type="text"
        onChange={handleChange}
        placeholder="create new todo"
        className="input"
      />
      {completed !== undefined ? (
        <input
          type="checkbox"
          onChange={() => setIsDone((prev) => !prev)}
          checked={isDone}
          className="checkbox"
        />
      ) : null}
      <button disabled={!inputValue} className="button">
        save
      </button>
    </form>
  );
};

export default TodoForm;
