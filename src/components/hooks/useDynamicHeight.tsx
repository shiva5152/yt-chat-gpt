import { useState, useEffect } from "react";

const useDynamicHeight = () => {
  const [height, setHeight] = useState("calc(var(--doc-height) - 10vh)");

  useEffect(() => {
    const updateHeight = () => {
      if (typeof window !== "undefined") {
        const vh10 = window.innerHeight * 0.1; // Calculate 10vh in pixels
        const newHeight = window.innerHeight - vh10; // Subtract 10vh from the total height
        setHeight(`${newHeight}px`); // Set the new height
      }
    };

    updateHeight();

    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateHeight);

      return () => window.removeEventListener("resize", updateHeight);
    }
  }, []);

  return height;
};

export default useDynamicHeight;
