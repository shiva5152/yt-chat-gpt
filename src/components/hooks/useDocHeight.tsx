import { useEffect } from "react";

const useDocumentHeight = () => {
  useEffect(() => {
    const setDocumentHeight = () => {
      if (typeof window !== "undefined") {
        const doc = document.documentElement;
        doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
      }
    };

    if (typeof window !== "undefined") {
      // Set the height on initial render
      window.addEventListener("resize", setDocumentHeight);
      setDocumentHeight();

      return () => {
        window.removeEventListener("resize", setDocumentHeight);
      };
    }
  }, []);
};

export default useDocumentHeight;
