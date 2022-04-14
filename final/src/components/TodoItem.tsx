import React from "react";

import { useDispatch } from "react-redux";
import { deleteTodo, toggleComplete } from "../redux/todoSlice";

interface props {
    id: number;
    title: string;
    completed: boolean;
}

const TodoItem = ({ id, title, completed }: props) => {
    const disatch = useDispatch();

    const handleCompleted = () => {
        disatch(
            toggleComplete({
                id: id,
                completed: !completed,
            })
        );
    };

    const handleDelete = () => {
        disatch(
            deleteTodo({
                id: id,
            })
        );
    };
    return (
        <li className={`list-group-item ${completed && "list-group-item-success"}`}>
            <div className="d-flex justify-content-between">
                <span className="d-flex align-items-center">
                    <input type="checkbox" className="mr-3" checked={completed} onClick={handleCompleted}></input>
                    {title}
                </span>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TodoItem;
