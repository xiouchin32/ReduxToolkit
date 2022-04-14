import React, { useEffect } from "react";
import TodoItem from "./TodoItem";
import { RootStateOrAny, useSelector, useDispatch } from "react-redux";
import { Todo } from "../redux/todoSlice";
import { RootState } from "../redux/store";
import { getTodosAsync } from "../redux/todoSlice";

function TodoList() {
    const dispatch = useDispatch();

    const todos: Todo[] = useSelector((state: RootState) => state.todos);

    useEffect(() => {
        dispatch(getTodosAsync());
    }, [dispatch]);

    return (
        <ul className="list-group">
            {todos.map((todo: any) => (
                <TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
            ))}
        </ul>
    );
}

export default TodoList;
