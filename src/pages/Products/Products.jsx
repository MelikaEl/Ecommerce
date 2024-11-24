import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getProductById from "../../utils/apis/products/getProductById";
import Header from "../../components/common/Header/Header";
import ProductSkeleton from "../../components/skeleton/ProductSkeleton/ProductSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";

const Products = () => {
  const { id } = useParams() || ""; // get id from params and if the id doesn't exist, makes it empty
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { isPending, error, data } = useQuery({
    queryKey: ["productById"],
    queryFn: () => getProductById(id),
  });

  console.log(data);
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-4">
        {isPending && <ProductSkeleton />}
        {error && <ErrorOnFetchApi />}
        {data && (
          <>
            <img
              className="w-[15rem] h-[15rem] rounded-xl"
              src={data?.data?.images[activeImageIndex].replace(/^["[]+|["\]]/g, "")}
             /* src={data?.data?.images[0].replace(/^["[]+|["\]]/g, "")}*/ //this code images[0] shows the first image
            />
            <div className="flex gap-2 flex-wrap">
              {data?.data?.images.map((image,index) => (
                <img
                  onClick={()=>setActiveImageIndex(index)}
                  key={image}
                  src={image.replace(/^["[]+|["\]]/g, "")}
                  className="w-[5rem] h-[5rem] rounded-xl"
                />
              ))}
            </div>
            <div className="bg-slate-400 animate-pulse w-[5rem] h-[1.5rem] rounded-xl"></div>
            <div className="bg-slate-400 animate-pulse w-[5rem] h-[1.5rem] rounded-xl"></div>
            <div className="bg-slate-400 animate-pulse w-[15rem] h-[5rem] rounded-xl"></div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
