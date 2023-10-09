import { useEffect, useRef } from "react";

export const useOutsideClick = (onClick, listenCapturing = true) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        //console.log("Close");
        onClick();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);
    return () => document.removeEventListener("click", handleClick);
  }, [onClick, listenCapturing]);

  return ref;
};
