import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";
import HTTPClient from "../api/api";
import { TodoType } from "../types/types";

const { GET } = HTTPClient();

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
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setTodo, setError } = todoSlice.actions;

export const todoData = ({ todo }: RootState) => todo.todo;

// export const login =
//   (user: UserType): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await POST(`login/`, user);
//       if (response.error) {
//         dispatch(setError(response.error));
//       }
//       dispatch(setAuth(response.message ? true : false));
//       dispatch(setLoading(false));
//     } catch (error: any) {
//       dispatch(setError(error.message));
//       dispatch(setLoading(false));
//     }
//   };

export const setTodoData = (): AppThunk => async (dispatch, getState) => {
  try {
    const response = await GET("");

    dispatch(setTodo(response));
  } catch (error: any) {
    dispatch(setError(error.message));
  }
};

// export const createPeople =
//   (user: PeopleType): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setLoading(true));
//       await POST(`table/`, user);
//       dispatch(setPeopleData("?limit=10"));
//       dispatch(setLoading(false));
//     } catch (error: any) {
//       dispatch(setError(error.message));
//       dispatch(setLoading(false));
//     }
//   };

// export const editPeople =
//   (id: number | undefined, value: PeopleType): AppThunk =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(setLoading(true));
//       await PUT(`table/${id}`, value);
//       dispatch(setPeopleData("?limit=10"));
//       dispatch(setLoading(false));
//     } catch (error: any) {
//       dispatch(setError(error.message));
//       dispatch(setLoading(false));
//     }
//   };

export default todoSlice.reducer;
