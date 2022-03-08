import React, { useState, useContext } from "react";
import { ListContext } from "./context/listContext";
import { TodoList } from "./components/TodoList";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { AddTodoForm } from "./components/AddTodoForm";
import { SearchBar } from "./components/SearchBar";

function App() {
  const [dark, setDark] = useState("");
  const [toggleClicked, setToggleClicked] = useState(false);
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const originalList = list;

  const handleToggle = () => {
    toggleClicked ? setToggleClicked(false) : setToggleClicked(true);
    toggleClicked ? setDark("") : setDark("dark");
  };

  const handleAddToto = () => {
    setShowAddForm(true);
  };

  const handleDelete = (id) => {
    const filteredList = originalList.filter((l) => l.id !== id);
    setList(filteredList);
    setShowOptions(false);
  };

  return (
    <ListContext.Provider
      value={{
        originalList,
        searchText,
        handleDelete,
        showOptions,
        setShowOptions,
      }}
    >
      <div
        className={`${dark} flex h-screen w-full items-center justify-center md:p-5`}
      >
        <div className="flex flex-col items-center w-full h-full p-5 text-gray-500 bg-gray-100 shadow-lg jusify-center dark:bg-gray-900 dark:text-orange-100 md:w-1/2">
          <header className="relative flex items-center justify-between w-full py-5 text-center">
            <div className="w-32">
              <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
              />
            </div>

            <h3 className="z-50 text-lg font-semibold text-center w-28 md:text-xl">
              To Do List
            </h3>

            <div className="">
              <label
                htmlFor="toggleB"
                className="flex items-center cursor-pointer"
              >
                <div className="relative">
                  <input
                    onClick={handleToggle}
                    type="checkbox"
                    id="toggleB"
                    className="sr-only"
                  />
                  <div className="block w-12 h-6 bg-blue-500 rounded-full"></div>
                  <div className="absolute w-4 h-4 transition bg-white rounded-full toggle left-1 top-1"></div>
                  <SunIcon
                    className={
                      toggleClicked
                        ? "hidden"
                        : "absolute right-1 top-0.5 h-5 w-5 text-white"
                    }
                  />
                  <MoonIcon
                    className={
                      !toggleClicked
                        ? "hidden"
                        : "absolute left-1 top-0.5 h-5 w-5 text-white"
                    }
                  />
                </div>
              </label>
            </div>
            {showAddForm && (
              <div className="absolute z-50 top-32 left-5 md:left-5 lg:left-10">
                <AddTodoForm
                  setShowAddForm={setShowAddForm}
                  list={list}
                  setList={setList}
                />
              </div>
            )}
          </header>
          <main className="relative w-full h-full">
            <PlusCircleIcon
              onClick={handleAddToto}
              className="absolute bottom-0 w-16 h-16 cursor-pointer right-5 fill-red-500"
            />

            <TodoList list={list} setList={setList} />
          </main>
          {showAddForm && (
            <div className="fixed top-0 left-0 z-20 flex justify-center w-screen h-screen">
              <div className="absolute top-0 left-0 w-screen h-screen bg-gray-900/90"></div>
            </div>
          )}
        </div>
      </div>
    </ListContext.Provider>
  );
}

export default App;
