import React, { useState } from "react";
import { XIcon } from "@heroicons/react/outline";
import { useStore } from "../store/listStore";

export const AddTodoForm = (props) => {
  const { list, addTodo } = useStore();
  const { setShowAddForm } = props;
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [contentIsValid, setContentIsValid] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoContent, setNewTodoContent] = useState("");
  const [newTodo, setNewTodo] = useState({
    id: "",
    title: "",
    content: "",
    complete: false,
    bgColor: "",
  });

  const handleNewTodoTitle = (e) => {
    let title = e.target.value;
    setNewTodoTitle(title.toUpperCase());
  };

  const handleNewTodoContent = (e) => {
    let content = e.target.value;
    setNewTodoContent(content[0].toUpperCase() + content.slice(1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTodoTitle.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }

    if (newTodoContent.trim().length === 0) {
      setContentIsValid(false);
    } else {
      setContentIsValid(true);
    }

    if (titleIsValid && contentIsValid) {
      newTodo.id = Math.floor(Math.random() * 10000);
      newTodo.title = newTodoTitle;
      newTodo.content = newTodoContent;
      newTodo.complete = false;
      addTodo(newTodo);
      setNewTodo({
        id: "",
        title: "",
        content: "",
        complete: false,
        bgColor: "",
      });
      setTitleIsValid(true);
      setContentIsValid(true);
      setShowAddForm(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex w-[300px] flex-col rounded-lg bg-blue-500 p-2 text-sm shadow-lg lg:w-[400px]"
    >
      <div className="flex justify-end mb-3 text-white">
        <XIcon
          onClick={() => setShowAddForm(false)}
          className="w-5 h-5 cursor-pointer"
        />
      </div>
      <div className="flex flex-col border border-gray-200 rounded-md dark:text-gray-60">
        <input
          onChange={handleNewTodoTitle}
          className="w-full p-2 text-gray-900 border-b-2 border-gray-300"
          type="text"
          placeholder="Title"
          value={newTodoTitle}
        />
        {!titleIsValid && (
          <p className="flex flex-col text-red-500">Invalid Input</p>
        )}
        <textarea
          onChange={handleNewTodoContent}
          className="h-40 p-2 text-gray-900"
          placeholder="Content"
        ></textarea>
        {!contentIsValid && (
          <p className="flex flex-col text-red-500">Invalid Input</p>
        )}
      </div>

      <div className="flex justify-end my-3">
        <button className="w-20 h-8 my-auto text-center text-gray-600 border border-gray-300 rounded-lg bg-cyan-200 hover:bg-cyan-400">
          Add
        </button>
      </div>
    </form>
  );
};
