import React from "react";
import { useQuery } from "@tanstack/react-query";
import getProductsByCategory from "../../../utils/apis/products/getProductsByCategory";

const ProductsByCategoryGrid = ({ id }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["productsByCategory"],
    queryFn: () => getProductsByCategory(id),
  });

  console.log(data);

  return (
    <div className="flex flex-wrap">
      {data &&
        data?.data?.map((product) => (
          <div
            key={product?.id}
            className="rounded-xl flex flex-col shadow-lg gap-4 items-center justify-center pb-4 w-3/12"
          >
            <img src={product?.images[0]} className="rounded-t-xl h-[8rem]" />
          </div>
        ))}
    </div>
  );
};

export default ProductsByCategoryGrid;
