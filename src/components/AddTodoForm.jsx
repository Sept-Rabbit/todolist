import React, { useState } from "react";

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) =>
      setValue({
        id: Math.floor(Math.random() * 10000),
        text: e.target.value,
        complete: false,
      }),
  };
};

export const AddTodoForm = (props) => {
  const { list, setList } = props;
  const [inputIsValid, setInputIsValid] = useState(true);
  const [newTodo, setNewTodo] = useState({ id: "", text: "", complete: false });

  const handleNewTodo = (e) => {
    setNewTodo({
      id: Math.floor(Math.random() * 10000),
      text: e.target.value,
      complete: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.text.trim().length === 0) {
      setInputIsValid(false);
    } else {
      setList([newTodo, ...list]);
      setNewTodo({ id: "", text: "", complete: false });
      setInputIsValid(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-row dark:text-gray-600">
        <input
          onChange={handleNewTodo}
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Add Todo List"
          value={newTodo.text}
        />
        <button className="w-20 p-2 text-center bg-gray-200 border border-gray-300 rounded-md ">
          Add
        </button>
      </div>

      {!inputIsValid && (
        <p className="flex flex-col text-red-500">Invalid Input</p>
      )}
    </form>
  );
};
