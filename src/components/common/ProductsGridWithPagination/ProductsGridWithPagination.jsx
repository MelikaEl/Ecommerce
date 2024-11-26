import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton";
import { Link } from "react-router-dom";
import getProductsApi from "../../../utils/apis/products/getProductsApi";
import Pagination from "@mui/material/Pagination";

const ProductsGridWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1); //because the first page is 1
  const limit = 6; //return 6 items per page
  const total = 200; //the total number of the products is defined 200 in the platzi fake store API
  const { isPending, error, data } = useQuery({
    queryKey: ["products", currentPage], //if the current page is change, we have the new request to show the new data
    queryFn: () => getProductsApi((currentPage - 1) * limit, limit),
  });

  // console.log(data);

  return (
    <div className="flex flex-wrap gap-4 px-8 items-center justify-center my-8">
      {
        isPending &&
          Array.from("123456").map((i) => (
            <ProductGridSkeleton key={i} />
          )) /* It shows 6 times the products skeleton */
      }
      {data &&
        data?.data?.map((product) => (
          <Link
            to={`/products/${product?.id}`}
            key={product?.id}
            className="rounded-xl flex flex-col shadow-lg gap-4 items-center justify-center pb-4 w-5/12 lg:w-3/12 "
          >
            <img
              src={product?.images[0].replace(/^["[]+|["\]]/g, "")}
              className="w-[100%] rounded-t-xl h-[15rem]"
              /*
            .replace(/^["[]+|["\]]/g, ""):
This is a regular expression used to remove unwanted characters from the image URL.
^["[]+|["\]]/g is a regex pattern that matches:
^["[]+: Any leading double quotes or square brackets
["\]]: Any trailing double quotes or square brackets
The replace function removes these characters, which might be present if the image URL is stored as a string with extra formatting.

*Anthropic is experiencing a partial outage right now. To avoid downtime, we've temporarily fallen back to an OpenAI model.*

The removal of certain characters from the image URL using the `replace` method is likely done to clean up the URL string before using it in the `src` attribute of the `<img>` tag. Here are some reasons why this might be necessary:

1. **Data Formatting**: 
   - Sometimes, data retrieved from an API or database might include extra formatting characters, such as quotes or brackets, especially if the data is stored as a JSON string or array. These characters are not valid in a URL and need to be removed.

2. **String Parsing**:
   - If the image URLs are stored as part of a larger string or array, they might be extracted with these extra characters. The `replace` method is used to parse and clean the string to ensure it is a valid URL.

3. **Consistency**:
   - Ensuring that all image URLs are consistently formatted helps prevent errors when rendering images. Invalid URLs can lead to broken images or failed network requests.

4. **Error Prevention**:
   - By removing these characters, you prevent potential issues with the browser's interpretation of the URL, which could otherwise result in images not loading correctly.

In summary, cleaning the URL ensures that it is in a proper format for use in the `src` attribute, which is crucial for the correct display of images in a web application.


The way that the backend save the image URL may not be compatible with the way that the browser show the image, so by this replace method on image, we do something that the image URL be compatible with the browser and browser show the image correctly. 
            */
            />
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
          </Link>
        ))}
      {
        data && (
          <div className="my-8">
            <Pagination
              onChange={(event, value) => {
                setCurrentPage(value);
                //console.log(value)// when we click on each page in the pagination the value in the console shows that page number
              }}
              size="large"
              count={Math.ceil(total / limit)}
              defaultPage={currentPage}
              boundaryCount={2}
            />
          </div>
          /*
          I'll break down how the pagination works in this code step by step:

1. **Key Pagination Variables**:
```javascript:src/components/common/ProductsGridWithPagination/ProductsGridWithPagination.jsx
const [currentPage, setCurrentPage] = useState(1); // Current page number, starts at 1
const limit = 6;    // Number of items per page
const total = 200;  // Total number of products in the database
```

2. **Data Fetching Logic**:
```javascript:src/components/common/ProductsGridWithPagination/ProductsGridWithPagination.jsx
// ... existing code ...
const { isPending, error, data } = useQuery({
  queryKey: ["products", currentPage], // Refetch when page changes
  queryFn: () => getProductsApi((currentPage - 1) * limit, limit),
});
```

Here's how it works:

1. **Pagination Calculation**:
   - `limit = 6`: Shows 6 products per page
   - `total = 200`: Total products in database
   - Total number of pages = `Math.ceil(total / limit)` = `Math.ceil(200 / 6)` = 34 pages

2. **Offset Calculation**:
   - When fetching data, it uses: `(currentPage - 1) * limit`
   - Example:
     - Page 1: `(1-1) * 6 = 0` → Gets products 0-5
     - Page 2: `(2-1) * 6 = 6` → Gets products 6-11
     - Page 3: `(3-1) * 6 = 12` → Gets products 12-17

3. **MUI Pagination Component**:
```javascript:src/components/common/ProductsGridWithPagination/ProductsGridWithPagination.jsx
<Pagination
  onChange={(event, value) => {
    setCurrentPage(value);  // Updates current page when user clicks
  }}
  size="large"
  count={Math.ceil(total / limit)}  // Total number of pages (34)
  defaultPage={currentPage}         // Starting page
  boundaryCount={2}                 // Number of pages shown at start/end
/>
```

4. **Data Flow**:
   - User clicks a page number
   - `onChange` updates `currentPage`
   - `useQuery` detects change in `currentPage`
   - New API call is made with updated offset
   - New products are fetched and displayed

This creates a smooth pagination experience where:
- Users can navigate through pages
- Only 6 items are loaded at a time (better performance)
- Loading states are handled (`isPending`)
- The URL parameters are calculated automatically
- React Query handles caching of previously fetched pages

          */
        ) /*count in the Pagination component is number of the pages */
      }
    </div>
  );
};

export default ProductsGridWithPagination;
