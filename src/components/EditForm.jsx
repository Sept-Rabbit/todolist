import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";

export const EditForm = (props) => {
  const { list, selectedTodo, setList, setShowEditForm } = props;
  const [inputIsValid, setInputIsValid] = useState(true);
  const [updatedTodo, setUpdatedTodo] = useState({
    id: selectedTodo.id,
    text: selectedTodo.text,
    complete: selectedTodo.complete,
  });
  let defaultVal = selectedTodo.text;

  const handleEditText = (e) => {
    setUpdatedTodo({
      id: selectedTodo.id,
      text: e.target.value,
      complete: selectedTodo.complete,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredList = list.filter((l) => l.id !== selectedTodo.id);
    if (updatedTodo.text.trim().length === 0) {
      setInputIsValid(false);
    } else {
      setList([...filteredList, updatedTodo]);
      setShowEditForm(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex justify-end mb-2 translate-x-5">
        <XIcon
          onClick={() => setShowEditForm(false)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>

      <div className="flex flex-row">
        <input
          onChange={handleEditText}
          className="w-full p-2 text-black border border-gray-300 rounded-md"
          type="text"
          value={updatedTodo.text}
          defaultValue={updatedTodo.text}
        />
        <button className="w-20 p-2 text-center text-black bg-gray-200 border border-gray-300 rounded-md">
          Edit
        </button>
      </div>

      {!inputIsValid && (
        <p className="flex flex-col text-red-500">Invalid Input</p>
      )}
    </form>
  );
};
