import React from "react";

interface ContentContainerProps {
  children: React.ReactNode;
}

function ContentContainer({ children }: ContentContainerProps) {
  return <div className="w-full">{children}</div>;
}
export default ContentContainer;
