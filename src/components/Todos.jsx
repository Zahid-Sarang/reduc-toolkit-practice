import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const handleSave = (id) => {
    dispatch(updateTodo({
      id: id,
      text: editingText,
    }));
    setEditingId(null);
    setEditingText("");
  };

  return (
    <>
      <h1>Todos</h1>
      {todos && todos.map((todo) => (
        <div className="bg-white p-[20px] flex justify-between items-center gap-7 mt-5 rounded-xl w-[600px]">
          <ul>
            {editingId === todo.id ? (
              <input 
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <li key={todo.id} className="text-[#122479] text-xl font-semibold">{todo.text}</li>
            )}
          </ul>
          <div className="flex">
            {editingId === todo.id ? (
              <>
                <button onClick={() => handleSave(todo.id)} className="mx-[30px] bg-green-400 p-2 rounded w-20 text-center cursor-pointer">Save</button>
                <button onClick={() => setEditingId(null)} className="mx-[30px] bg-red-400 p-2 rounded w-20 text-center cursor-pointer">Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(todo.id, todo.text)} className="mx-[30px] bg-blue-400 p-2 rounded w-20 text-center cursor-pointer">Edit</button>
                <button onClick={() => dispatch(removeTodo(todo.id))} className="mx-[30px] bg-red-400 p-2 rounded w-20 text-center cursor-pointer">Remove</button>
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default Todos;
