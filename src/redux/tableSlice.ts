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
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    addTodo: (state, action: PayloadAction<TodoType>) => {
      state.todo.unshift(action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    editedTodo: (state, action: PayloadAction<TodoType>) => {
      state.todo = state.todo.map((td) =>
        td.id === action.payload.id ? action.payload : td
      );
      localStorage.setItem("todos", JSON.stringify(state.todo));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todo = state.todo.filter((td) => td.id !== action.payload);
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
