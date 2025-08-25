import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {

  const [shouldShow, setShouldShow] = useState(false);

  const handleTopScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    const handleScroll = () => {
      const offsetY = window.scrollY;
      setShouldShow(offsetY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!shouldShow) return null;
  return (
    <div className="fixed right-6 bottom-4 z-50 w-10 h-10 cursor-pointer bg-brand rounded-full
         flex justify-center items-center animate-bounce border-2 border-white md:h-12 md:w-12" onClick={handleTopScroll}>
      <FaArrowUp className="text-white h-6 w-6" />
    </div>
  )
}

export default ScrollToTop;