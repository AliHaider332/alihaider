// components/Home/Home.tsx
"use client";

import { useEffect, useState } from "react";
import LeftDescription from "./LeftDiscription";
import RightPicture from "./RightPicture";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
  id="home"
  className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
  aria-label="Introduction"
>
  <div
    className="relative grid grid-cols-1 items-center gap-12 py-12
               lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16
               lg:py-20 min-h-[80vh]"
  >
    {/* Left — content column */}
    <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
      <div className="w-full max-w-xl lg:max-w-none">
        <LeftDescription isParentVisible={isVisible} />
      </div>
    </div>

    {/* Right — portrait */}
    <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
      <div className="w-full max-w-[420px] sm:max-w-[460px]">
        <RightPicture isParentVisible={isVisible} />
      </div>
    </div>
  </div>
</section>
  );
};

export default Home;
