import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import HTTPClient from "../api/api";
import { TodoType } from "../types/types";

const { GET, POST, PUT, DELETE } = HTTPClient();

const initialState = {
  todo: [] as TodoType[],
  error: "",
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<TodoType[]>) => {
      state.todo = action.payload;
      //Fixing changes in the localStorage
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todo.unshift(action.payload);
      //Fixing changes in the localStorage
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    editedTodo: (state, action: PayloadAction<TodoType>) => {
      state.todo = state.todo.map((td) =>
        td.id === action.payload.id ? action.payload : td
      );
      //Fixing changes in the localStorage
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todo = state.todo.filter((td) => td.id !== action.payload);
      //Fixing changes in the localStorage
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setTodo, addTodo, editedTodo, deleteTodo, setError } =
  todoSlice.actions;

export const todoData = ({ todo }: RootState) => todo.todo;

export const setTodoData = (): AppThunk => async (dispatch, getState) => {
  try {
    //If your task list is empty, the list will be saved from the API, then all changes will be saved to localStorage and if it is not empty, the list will be taken from there
    const todos = JSON.parse(
      localStorage.getItem("todos") as string
    ) as TodoType[];

    const response = await GET("");

    dispatch(setTodo(response));

    if (todos.length) {
      dispatch(setTodo(todos));
    }
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

export const postTodo =
  (value: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await POST("", value);

      dispatch(
        addTodo({
          userId: response.userId,
          //Add a random number to the id of the resulting todo so that I can add several new ones, since the API corresponds to a todo with a repeating id
          id: response.id + Math.random(),
          title: response.title,
          completed: response.completed,
        })
      );
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export const editTodo =
  (value: TodoType): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await PUT(`${value.id}`, value);

      dispatch(editedTodo(response));
    } catch (error: any) {
      dispatch(setError(error.message));
      //Since API responds to todos with a duplicate id, this solution helps to edit all new todos, although an error is generated from the server
      dispatch(editedTodo(value));
    }
  };

export const removeTodo =
  (id: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      await DELETE(`${id}`);

      dispatch(deleteTodo(id));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

export default todoSlice.reducer;
