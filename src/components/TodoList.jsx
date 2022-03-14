import React, { useContext, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { EditForm } from "./EditForm";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TodoOptions } from "./TodoOptions";
import { ListContext } from "../context/listContext";
import { useStore } from "../store/listStore";

export const TodoList = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const { list } = useStore();
  let [todoList, setTodoList] = useState([]);
  const [bgColor, setBgColor] = useState("");

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

  let { searchText, showOptions, setShowOptions } = useContext(ListContext);
  if (searchText.length !== 0) {
    let filteredList = list.filter((l) => {
      return l.title.toLowerCase().includes(searchText);
    });
    todoList = filteredList;
  } else {
    todoList = list;
  }

  const handleOptions = (id) => {
    setShowOptions(true);
    let selectTodo = todoList.filter((l) => l.id === id);
    setSelectedTodo({
      id: selectTodo[0].id,
      title: selectTodo[0].title,
      content: selectTodo[0].content,
      complete: selectTodo[0].complete,
      bgColor: selectedTodo[0]?.bgColor,
    });
  };

  const handleBgColor = (id, bgColor) => {
    let selectTodo = todoList.filter((l) => l.id === id);

    selectedTodo.id = selectTodo[0].id;
    selectedTodo.title = selectTodo[0].title;
    selectedTodo.content = selectTodo[0].content;
    selectedTodo.complete = selectTodo[0].complete;
    selectedTodo.bgColor = bgColor;

    const selectIndex = todoList.findIndex((l) => l.id === selectedTodo.id);
    todoList[selectIndex] = selectedTodo;
    setShowOptions(false);
  };

  const handleCheck = (id) => {
    let updatedList = todoList.map((l) => {
      if (l.id === id) {
        l.complete = !l.complete;
      }
      return l;
    });

    setTodoList(updatedList);
    setShowOptions(false);
  };

  const handleEdit = (id) => {
    let selectTodo = todoList.filter((l) => l.id === id);
    setShowEditForm(true);
    setSelectedTodo({
      id: selectTodo[0].id,
      title: selectTodo[0].title,
      content: selectTodo[0].content,
      complete: selectTodo[0].complete,
      bgColor: selectedTodo[0]?.bgColor,
    });
    setShowOptions(false);
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) {
      return;
    }
    const items = Array.from(todoList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    todoList = items;
  };

  return (
    <>
      <div className="relative flex flex-col items-center justify-center py-5 text-sm border-t-2 border-gray-500">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="todos">
            {(provided) => (
              <ul
                className="relative grid w-full grid-cols-2 gap-7"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {todoList.map((l, index) => {
                  return (
                    <Draggable
                      draggableId={l.id.toString()}
                      index={index}
                      key={l.id}
                    >
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
                                    ? "text-md font-medium line-through hover:text-white dark:text-shadow-sm dark:hover:text-blue-500 dark:hover:text-shadow-none"
                                    : "text-md font-medium hover:text-white dark:text-shadow-sm dark:hover:text-blue-500 dark:hover:text-shadow-none"
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
                      list={todoList}
                      handleEdit={handleEdit}
                      handleCheck={handleCheck}
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
                      list={todoList}
                      setList={setTodoList}
                      setShowOptions={setShowOptions}
                    />
                  </div>
                )}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {(showEditForm || showOptions) && (
        <div className="fixed top-0 left-0 z-20 flex justify-center w-screen h-screen">
          <div className="absolute top-0 left-0 w-screen h-screen bg-gray-900/90"></div>
        </div>
      )}
    </>
  );
};
