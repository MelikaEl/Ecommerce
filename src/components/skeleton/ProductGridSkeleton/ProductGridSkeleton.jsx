import React from "react";

const ProductGridSkeleton = () => {
  return (
    <div className="rounded-xl flex flex-col shadow-lg gap-4 items-center justify-center pb-4">
      <div className="bg-slate-400 animate-pulse rounded-t-xl h-[8rem] w-[15rem]"></div>
      <div className="bg-slate-400 animate-pulse rounded-xl w-[7rem] h-[1rem]"></div>
      <div className="bg-slate-400 animate-pulse rounded-xl w-[7rem] h-[1rem]"></div>
    </div>
  );
};

export default ProductGridSkeleton;
