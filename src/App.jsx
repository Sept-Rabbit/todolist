import React, { useState } from "react";
import { TodoList } from "./components/TodoList";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/outline";

function App() {
  const [dark, setDark] = useState("");
  const [toggleClicked, setToggleClicked] = useState(false);

  const handleToggle = () => {
    toggleClicked ? setToggleClicked(false) : setToggleClicked(true);
    toggleClicked ? setDark("") : setDark("dark");
  };

  return (
    <div
      className={`${dark} flex h-screen w-full items-center justify-center md:p-5`}
    >
      <div className="flex flex-col items-center w-full h-full p-5 text-gray-500 bg-gray-100 shadow-lg jusify-center dark:bg-gray-900 dark:text-orange-100 md:w-1/2">
        <header className="relative flex items-center justify-center w-full py-5 text-center">
          <h3 className="text-xl text-center">To Do List</h3>
          <div className="absolute right-0">
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
        </header>
        <main className="relative w-full h-full">
          <TodoList />
        </main>
      </div>
    </div>
  );
}

export default App;
