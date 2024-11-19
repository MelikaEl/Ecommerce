import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useQuery } from "@tanstack/react-query";
import getCategoriesApi from "../../../utils/apis/categories/getCategoriesApi";
import { Category } from "@mui/icons-material";

const CategoriesChips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  console.log(data);
  return (
    <div className="mx-4 flex flex-wrap gap-4">
      {data &&
        data?.data.map(
          (
            category //instead of name category, we can put any name instead of that
          ) => (
            <Chip
              sx={{ height: "5rem" }} //by the sx prop of MUI we can apply style
              key={category?.id}
              avatar={
                <Avatar
                  sx={{ width: "4rem !important", height: "4rem !important" }}//CSS Specificity: The !important declaration in CSS increases the specificity of a style rule, making it take precedence over other styles that may be applied to the same element. In this case, it ensures that the specified width and height of "4rem" are applied regardless of any other styles that might conflict with these dimensions.
                  alt={`${category?.name}`}
                  src={category?.image}
                />
              }
              label={category?.name}
              variant="outlined"
            />
          )
        )}
    </div>
    /*
    In the provided React code snippet, the map method is used to dynamically render a list of Chip components based on the data retrieved from an API. Here’s a detailed explanation of its purpose and functionality:
Purpose of Using map Method
The map method is a built-in JavaScript function that creates a new array by applying a provided function to each element of an existing array. In the context of React, it is commonly used for rendering lists of components efficiently. Here’s how it applies in your code:
Dynamic Rendering: The data?.data.map(...) line iterates over the array of categories returned from the API call. For each category object, it generates a corresponding Chip component, allowing for dynamic rendering based on the data received
    */
  );
};

export default CategoriesChips;
