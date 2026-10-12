import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
}

function MainContainer({ children }: MainContainerProps) {
  return (
    <div className={`w-full h-full flex flex-row font-[Poppins] `}>
      {children}
    </div>
  );
}

export default MainContainer;
