// hooks/useInfiniteScroll.js
import { useEffect } from "react";

const useInfiniteScroll = (ref, callback, offset = 50) => {
  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - offset) {
        callback(); // Call your API or pagination function
      }
    };

    const el = ref.current;
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, [ref, callback, offset]);
};

export default useInfiniteScroll;
