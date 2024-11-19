import * as React from "react";

const CategoriesChipsSkeleton = () => {
  return Array.from("123456").map((i) => (
    <div key={i} className="mx-4 flex flex-wrap gap-4">
      <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-md">
        <div className="w-[3rem] h-[3rem] bg-slate-400 animate-pulse rounded-full"></div>
        <div className="w-[4rem] h-[1rem] bg-slate-400 animate-pulse rounded-lg"></div>
      </div>
    </div>
    /*
    In the provided React code snippet, the map method is used to dynamically render a list of Chip components based on the data retrieved from an API. Here’s a detailed explanation of its purpose and functionality:
Purpose of Using map Method
The map method is a built-in JavaScript function that creates a new array by applying a provided function to each element of an existing array. In the context of React, it is commonly used for rendering lists of components efficiently. Here’s how it applies in your code:
Dynamic Rendering: The data?.data.map(...) line iterates over the array of categories returned from the API call. For each category object, it generates a corresponding Chip component, allowing for dynamic rendering based on the data received
    */
  ));
};

export default CategoriesChipsSkeleton;
