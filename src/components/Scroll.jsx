import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../thunk/scrollThunk";

function Scroll() {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const scrollRef = useRef(null); 

  //  Scroll handler for detecting bottom
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight;
    const clientHeight = el.clientHeight;

    console.log("ScrollTop:", scrollTop);
    console.log("ClientHeight:", clientHeight);
    console.log("ScrollHeight:", scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight-50 ) {
      console.log("Reached bottom! Load more...");
      setPage((prevPage) => prevPage + 1);
    }
  };

  //  Attach scroll listener to div
  useEffect(() => {
    const div = scrollRef.current;
    if (!div) return;

    div.addEventListener("scroll", handleScroll); 

    return () => div.removeEventListener("scroll", handleScroll);
  }, []);

//   const handleClick = () => {
//     handleScroll();
//   };


  useEffect(() => {
    dispatch(fetchUser(page));
  }, [page]);

  return (
    <div className="flex justify-center items-center gap-3.5 h-screen">
      {products && (
        <div
          ref={scrollRef} 
          className="bg-red-200 border w-60 h-64 overflow-y-scroll"
        >
          {products.map((product, i) => (
            <div key={i}>
            <div className="w-14 h-28 bg-amber-500 border text-center">....</div>
              {/* <img className="w-4xl" src={product?.images[0]} alt="" /> */}
              {product.title}
            </div>
          ))}
        </div>
      )}

      {/* Product Count */}
      <div>{products && products.length}</div>

      {/* Manual Load More Button */}
      {/* <button onClick={handleClick} className="border px-2.5">
        click
      </button> */}
    </div>
  );
}

export default Scroll;
