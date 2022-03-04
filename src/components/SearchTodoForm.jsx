import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

export const SearchTodoForm = (props) => {
  const { list, setList } = props;
  const [inputIsValid, setInputIsValid] = useState(true);
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim().length === 0) {
      setInputIsValid(false);
    } else {
      setInputIsValid(true);
      let result = list.find(
        (l) =>
          l.title.toLowerCase() ||
          l.content.toLowerCase() === searchText.toLowerCase()
      );
      console.log(result);
      setList(result);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-4/5">
      <div className="relative flex flex-row h-8 dark:text-gray-600">
        <input
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md"
          type="text"
          placeholder="Enter Search Keyword"
          value={searchText}
        />

        <button className="w-20 p-2 text-center bg-gray-200 border border-gray-300 rounded-md ">
          <SearchIcon className="absolute w-6 h-6 right-5 top-1" />
        </button>
      </div>

      {!inputIsValid && (
        <p className="flex flex-col text-red-500">Invalid Input</p>
      )}
    </form>
  );
};
