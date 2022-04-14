import React from "react";
import TodoItem from "./TodoItem";
import { RootStateOrAny, useSelector } from "react-redux";
import { Todo } from "../redux/todoSlice";
import { RootState } from "../redux/store";

function TodoList() {
    const todos: Todo[] = useSelector((state: RootState) => state.todos);

    return (
        <ul className="list-group">
            {todos.map((todo: any) => (
                <TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
        </ul>
    );
}

export default TodoList;
