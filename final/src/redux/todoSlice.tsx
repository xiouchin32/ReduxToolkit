import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deflate } from "zlib";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const initialState = [] as Todo[];

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTodo: Todo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false,
            };
            state.push(newTodo);
        },
        toggleComplete: (state, action: PayloadAction<{ id: number; completed: boolean }>) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
            /*need add return because filter wouldn't creat new array*/
            return state.filter((todo) => todo.id !== action.payload.id);
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
