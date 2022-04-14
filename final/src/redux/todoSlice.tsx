import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { deflate } from "zlib";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export const getTodosAsync = createAsyncThunk("todos/getTodosAsync", async () => {
    const res = await fetch("http://localhost:7000/todos");
    if (res.ok) {
        const todos = await res.json();
        return { todos };
    }
});

export const addTodoAsync = createAsyncThunk("todos/addTodoAsync", async (payload: { title: string }) => {
    const res = await fetch("http://localhost:7000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: payload.title }),
    });
    if (res.ok) {
        const todo = await res.json();
        return { todo };
    }
});

export const toggleClickAsync = createAsyncThunk(
    "todos/toggleClickAsync",
    async (payload: { id: number; completed: boolean }) => {
        const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ completed: payload.completed }),
        });
        if (res.ok) {
            const todo = await res.json();
            return { id: todo.id, completed: todo.completed };
        }
    }
);

export const deleteClickAsync = createAsyncThunk("todos/deleteClickAsync", async (payload: { id: number }) => {
    const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (res.ok) {
        const todos = await res.json();
        return { todos };
    }
});

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
    extraReducers: {
        /*thunk to export*/
        [getTodosAsync.pending.type]: (state, action) => {
            console.log("fething data....");
        },
        [getTodosAsync.fulfilled.type]: (state, action) => {
            console.log("fething data success");
            return action.payload.todos;
        },
        [addTodoAsync.fulfilled.type]: (state, action) => {
            return [...state, action.payload.todo];
        },
        [toggleClickAsync.fulfilled.type]: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
        [deleteClickAsync.fulfilled.type]: (state, action) => {
            return action.payload.todos;
        },
    },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
