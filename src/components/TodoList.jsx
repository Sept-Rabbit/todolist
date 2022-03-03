import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AddTodoForm } from "./AddTodoForm";
import { EditForm } from "./EditForm";
import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/outline";

export const TodoList = () => {
  const [list, setList] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [inputIsValid, setInputIsValid] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState({
    id: "",
    text: "",
    complete: false,
  });

  let reverseList = [];

  const colors = [
    "bg-red-400",
    "bg-orange-300",
    "bg-amber-600",
    "bg-yellow-200",
    "bg-green-300",
    "bg-cyan-300",
  ];

  const handleDelete = (id) => {
    const filteredList = list.filter((l) => l.id !== id);
    setList(filteredList);
  };

  const handleCheck = (id) => {
    let updatedList = list.map((l) => {
      if (l.id === id) {
        l.complete = !l.complete;
      }
      return l;
    });

    setList(updatedList);
  };

  const handleEdit = (id) => {
    let selectTodo = list.filter((l) => l.id === id);
    setShowEditForm(true);
    setSelectedTodo({
      id: selectTodo[0].id,
      text: selectTodo[0].text,
      complete: selectTodo[0].complete,
    });
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  return (
    <>
      <div className="">
        <AddTodoForm list={list} setList={setList} className="w-full" />
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="relative my-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map((l, index) => {
                  return (
                    <Draggable draggableId={l.text} index={index} key={l.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative flex flex-row items-center justify-between px-3 py-2 my-3 border border-gray-900 rounded-md list dark:border-white"
                        >
                          <li
                            className={
                              l.complete
                                ? "line-through hover:text-white dark:hover:text-blue-500"
                                : "hover:text-white dark:hover:text-blue-500"
                            }
                          >
                            {l.text}
                          </li>
                          <div className="flex flex-row items-center">
                            <CheckCircleIcon
                              onClick={() => handleCheck(l.id)}
                              className={
                                l.complete.toString() === "true"
                                  ? "h-5 w-5 cursor-pointer fill-sky-400 text-white dark:fill-green-800"
                                  : "h-5 w-5 cursor-pointer hover:text-white dark:hover:text-blue-500"
                              }
                            />
                            <PencilIcon
                              onClick={() => handleEdit(l.id)}
                              className="w-5 h-5 mx-5 cursor-pointer hover:text-white dark:hover:text-blue-500"
                            />
                            <TrashIcon
                              onClick={() => handleDelete(l.id)}
                              className="w-5 h-5 cursor-pointer hover:text-white dark:hover:text-blue-500"
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {showEditForm ? (
                  <div className="absolute z-50 w-4/5 top-16">
                    <EditForm
                      setShowEditForm={setShowEditForm}
                      selectedTodo={selectedTodo}
                      list={list}
                      setList={setList}
                    />
                  </div>
                ) : null}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {showEditForm && (
        <div className="fixed top-0 left-0 z-20 flex justify-center w-screen h-screen">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-900/80"></div>
        </div>
      )}
    </>
  );
};
