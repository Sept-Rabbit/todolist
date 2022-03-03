import React, { useState } from "react";
import { TodoList } from "./components/TodoList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center justify-center w-full h-screen md:p-5">
      <div className="flex flex-col items-center w-full h-full p-5 bg-blue-900 shadow-lg jusify-center md:w-1/2">
        <header className="flex justify-center py-5 text-white">
          To Do List
        </header>
        <main className="w-4/5 h-full">
          <TodoList />
        </main>
      </div>
    </div>
  );
}

export default App;
