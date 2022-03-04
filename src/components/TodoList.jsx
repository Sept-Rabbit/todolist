import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AddTodoForm } from "./AddTodoForm";
import { SearchTodoForm } from "./SearchTodoForm";
import { EditForm } from "./EditForm";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TodoOptions } from "./TodoOptions";

export const TodoList = () => {
  const [list, setList] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({
    id: "",
    title: "",
    content: "",
    complete: false,
    bgColor: "",
  });
  const [updatedTodo, setUpdatedTodo] = useState({
    id: "",
    title: "",
    content: "",
    complete: false,
    bgColor: "",
  });

  const handleOptions = (id) => {
    setShowOptions(true);
    let selectTodo = list.filter((l) => l.id === id);
    setSelectedTodo({
      id: selectTodo[0].id,
      title: selectTodo[0].title,
      content: selectTodo[0].content,
      complete: selectTodo[0].complete,
      bgColor: selectedTodo[0]?.bgColor,
    });
  };

  const handleBgColor = (id, bgColor) => {
    let selectTodo = list.filter((l) => l.id === id);

    selectedTodo.id = selectTodo[0].id;
    selectedTodo.title = selectTodo[0].title;
    selectedTodo.content = selectTodo[0].content;
    selectedTodo.complete = selectTodo[0].complete;
    selectedTodo.bgColor = bgColor;

    const selectIndex = list.findIndex((l) => l.id === selectedTodo.id);
    list[selectIndex] = selectedTodo;
    setShowOptions(false);
  };

  const handleAddToto = () => {
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const filteredList = list.filter((l) => l.id !== id);
    setList(filteredList);
    setShowOptions(false);
  };

  const handleCheck = (id) => {
    let updatedList = list.map((l) => {
      if (l.id === id) {
        l.complete = !l.complete;
      }
      return l;
    });

    setList(updatedList);
    setShowOptions(false);
  };

  const handleEdit = (id) => {
    let selectTodo = list.filter((l) => l.id === id);
    setShowEditForm(true);
    setSelectedTodo({
      id: selectTodo[0].id,
      title: selectTodo[0].title,
      content: selectTodo[0].content,
      complete: selectTodo[0].complete,
      bgColor: selectedTodo[0].bgColor,
    });
    setShowOptions(false);
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
      <PlusCircleIcon
        onClick={handleAddToto}
        className="absolute bottom-0 w-16 h-16 cursor-pointer right-5 fill-red-500"
      />
      <div className="relative flex flex-col items-center justify-center text-sm">
        <div className="flex items-center justify-center w-full pb-5 border-b-2 border-gray-500">
          <SearchTodoForm list={list} setList={setList} />
        </div>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="relative grid w-full grid-cols-2 gap-5 px-3"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {showAddForm && (
                  <div className="absolute z-50 left-5 md:left-5 lg:left-10">
                    <AddTodoForm
                      setShowAddForm={setShowAddForm}
                      list={list}
                      setList={setList}
                    />
                  </div>
                )}
                {list.map((l, index) => {
                  return (
                    <Draggable draggableId={l.title} index={index} key={l.id}>
                      {(provided) => (
                        <div
                          onClick={() => handleOptions(l.id)}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${l.bgColor} relative my-5 rounded-md border border-gray-900 px-3 py-2 dark:border-white`}
                        >
                          <li>
                            <div className="flex flex-row items-center justify-between pb-2 mb-3 border-b-2 border-gray-500">
                              <h6
                                className={
                                  l.complete
                                    ? "text-md line-through hover:text-white dark:text-shadow-sm dark:hover:text-blue-500 dark:hover:text-shadow-none"
                                    : "text-md hover:text-white dark:text-shadow-sm dark:hover:text-blue-500 dark:hover:text-shadow-none"
                                }
                              >
                                {l.title}
                              </h6>
                            </div>

                            <p className="w-full h-16 text-xs dark:text-shadow-sm">
                              {l.content}
                            </p>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  );
                })}

                {showOptions && (
                  <div className="absolute z-50 top-10 left-16 lg:left-16 xl:left-40">
                    <TodoOptions
                      selectedTodo={selectedTodo}
                      list={list}
                      handleEdit={handleEdit}
                      handleCheck={handleCheck}
                      handleDelete={handleDelete}
                      setShowOptions={setShowOptions}
                      handleBgColor={handleBgColor}
                    />
                  </div>
                )}
                {showEditForm && (
                  <div className="absolute z-50 w-4/5 left-5 top-10 lg:left-16 xl:left-40">
                    <EditForm
                      setShowEditForm={setShowEditForm}
                      selectedTodo={selectedTodo}
                      list={list}
                      setList={setList}
                    />
                  </div>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {(showEditForm || showAddForm || showOptions) && (
        <div className="fixed top-0 left-0 z-20 flex justify-center w-screen h-screen">
          <div className="absolute top-0 left-0 w-screen h-screen bg-gray-900/90"></div>
        </div>
      )}
    </>
  );
};
