import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TotalCompleteItems from "./components/TotalCompleteItems";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="container bg-white p-4 mt-5">
            <h1>My Todo List</h1>
            <AddTodoForm />
            <TodoList />
            <TotalCompleteItems />
        </div>
    );
}

export default App;
