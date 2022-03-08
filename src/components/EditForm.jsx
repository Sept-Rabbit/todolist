import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";

export const EditForm = (props) => {
  const { list, selectedTodo, setList, setShowEditForm, setShowOptions } =
    props;

  const [titleIsValid, setTitleIsValid] = useState(true);
  const [contentIsValid, setContentIsValid] = useState(true);
  const [todoTitle, setTodoTitle] = useState(selectedTodo.title);
  const [todoContent, setTodoContent] = useState(selectedTodo.content);

  const [updatedTodo, setUpdatedTodo] = useState({
    id: selectedTodo.id,
    title: todoTitle,
    content: todoContent,
    complete: selectedTodo.complete,
    bgColor: selectedTodo?.bgColor,
  });

  const handleEditTitle = (e) => {
    setTodoTitle(e.target.value);
  };

  const handleEditContent = (e) => {
    setTodoContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectIndex = list.findIndex((l) => l.id === updatedTodo.id);

    if (todoTitle.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }

    if (todoContent.trim().length === 0) {
      setContentIsValid(false);
    } else {
      setContentIsValid(true);
    }

    updatedTodo.title = todoTitle;
    updatedTodo.content = todoContent;

    if (titleIsValid && contentIsValid) {
      list[selectIndex] = updatedTodo;
      setShowEditForm(false);
      setShowOptions(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex w-[300px] flex-col rounded-lg bg-blue-500 p-2 text-sm shadow-lg lg:w-[400px]"
    >
      <div className="flex justify-end mb-3 text-white">
        <XIcon
          onClick={() => setShowEditForm(false)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
      <div className="flex flex-col border border-gray-200 rounded-md dark:text-gray-60">
        <input
          onChange={handleEditTitle}
          className="w-full p-2 text-gray-900 border-b-2 border-gray-300"
          type="text"
          placeholder="Title"
          value={todoTitle}
        />
        {!titleIsValid && (
          <p className="flex flex-col text-red-500">Invalid Input</p>
        )}
        <textarea
          onChange={handleEditContent}
          className="h-40 p-2 text-gray-900"
          placeholder="Content"
          value={todoContent}
        ></textarea>
        {!contentIsValid && (
          <p className="flex flex-col text-red-500">Invalid Input</p>
        )}
      </div>

      <div className="flex justify-end my-3">
        <button className="w-20 h-8 my-auto text-center text-gray-600 border border-gray-300 rounded-lg bg-cyan-200 hover:bg-cyan-400">
          Edit
        </button>
      </div>
    </form>
  );
};
