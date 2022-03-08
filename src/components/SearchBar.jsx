import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { ListContext } from "../context/listContext";

export const SearchBar = ({ searchText, setSearchText }) => {
  const handleSearch = (e) => {
    e.preventDefault();

    let keyword = e.target.value.toLowerCase();
    setSearchText(keyword);
  };

  return (
    <div className="flex flex-col -translate-y-2 md:translate-y-0">
      <div className="relative flex flex-col dark:text-gray-600">
        <label
          htmlFor="search by title"
          className="flex justify-start px-2 text-xs md:hidden"
        >
          Search Title
        </label>
        <div className="relative flex flex-row h-7">
          <input
            onChange={handleSearch}
            className="w-full p-2 text-xs border border-gray-300 rounded-md"
            type="text"
            placeholder="Search Title"
            value={searchText}
          />

          <button className="w-12 p-2 text-center bg-gray-200 border border-gray-300 rounded-md ">
            <SearchIcon className="absolute right-2.5 top-1.5 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
