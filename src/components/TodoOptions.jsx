import React, { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { ColorSwatchIcon } from "@heroicons/react/outline";

const colors = [
  "bg-green-300",
  "bg-orange-400",
  "bg-amber-300",
  "bg-cyan-300",
  "bg-blue-400",
  "bg-pink-400",
];

export const TodoOptions = (props) => {
  const {
    selectedTodo,
    handleCheck,
    handleDelete,
    handleEdit,
    setShowOptions,
    handleBgColor,
  } = props;
  const id = selectedTodo.id;
  const [showColors, setShowColors] = useState(false);

  const handleShowColors = () => {
    setShowColors(!showColors);
  };

  return (
    <div className="flex flex-col justify-start w-48 h-full px-5 py-3 rounded-md text-md bg-gray-300/90 dark:text-shadow-sm">
      <div className="flex justify-end mb-3 text-sm">
        <XIcon
          onClick={() => setShowOptions(false)}
          className="w-4 h-4 cursor-pointer"
        />
      </div>
      <div
        onClick={() => handleCheck(id)}
        className="flex flex-row items-center justify-between h-6 px-2 rounded-md cursor-pointer hover:bg-gray-200"
      >
        <CheckCircleIcon
          className={
            selectedTodo.complete.toString() === "true"
              ? "h-5 w-5 fill-sky-400  dark:fill-sky-500"
              : "h-5 w-5"
          }
        />
        <p>Complete</p>
      </div>
      <div
        onClick={() => handleEdit(id)}
        className="flex flex-row items-center justify-between h-6 px-2 my-3 rounded-md cursor-pointer hover:bg-gray-200"
      >
        <PencilIcon className="w-5 h-5 hover:text-white dark:text-shadow-sm" />
        <p>Edit</p>
      </div>
      <div
        onClick={() => handleDelete(id)}
        className="flex flex-row items-center justify-between h-6 px-2 rounded-md cursor-pointer hover:bg-gray-200 dark:text-shadow-sm"
      >
        <TrashIcon className="w-5 h-5 hover:text-white dark:text-shadow-sm" />
        <p>Delete</p>
      </div>
      <div
        onClick={handleShowColors}
        className="flex flex-row items-center justify-between h-6 px-2 my-3 rounded-md cursor-pointer hover:bg-gray-200 dark:text-shadow-sm"
      >
        <ColorSwatchIcon className="w-5 h-5 hover:text-white dark:text-shadow-sm" />
        <p>Set Color</p>
      </div>
      {showColors && (
        <div className="flex gap-2">
          {colors.map((c, i) => {
            return (
              <div
                onClick={() => handleBgColor(id, c)}
                className={`${c} h-5 w-5`}
                key={i}
              >
                {""}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
