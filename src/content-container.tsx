import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
  onClick?: () => void;
  dimTheLights: boolean;
}

function ContentContainer({
  children,
  onClick,
  dimTheLights,
}: ContentContainerProps) {
  return (
    <div
      className={`w-full h-full min-h-screen  ${dimTheLights ? "bg-black/50 lg:bg-linear-to-b from-[#F8FAFC] to-[#EFF6FF]" : " bg-linear-to-b from-[#F8FAFC] to-[#EFF6FF]"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
export default ContentContainer;
