import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Todo } from "../redux/todoSlice";

const TotalCompleteItems = () => {
    const todos: Todo[] = useSelector((state: RootState) => state.todos.filter((todo) => todo.completed === true));
    return <h4 className="mt-3">Total Complete Items: {todos.length}</h4>;
};

export default TotalCompleteItems;
