import React from "react";
import { useQuery } from "@tanstack/react-query";
import getProductsByCategory from "../../../utils/apis/products/getProductsByCategory";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton";

const ProductsByCategoryGrid = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => getProductsByCategory(id),
  });

  console.log(data);

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
          <div
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
            */
            />
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
          </div>
        ))}
    </div>
  );
};

export default ProductsByCategoryGrid;
