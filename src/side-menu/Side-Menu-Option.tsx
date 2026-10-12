import type { CommonNavaigationLink } from "../Models/CommonModels";
import { useNavigate, useMatch } from "react-router";

interface SideMenuOptionProps {
  isParent: boolean;
  link: CommonNavaigationLink;
}

function SideMenuOption({ isParent, link }: SideMenuOptionProps) {
  const navigator = useNavigate();
  const handleClickSideMenuItem = (url: string) => {
    navigator(url);
  };
  function useDetermineCurrentPath() {
    const isCurrentPath = useMatch(link.url);
    const isParentPath = useMatch(`${link.url}/*`);
    return isCurrentPath || isParentPath;
  }
  const isCurrentPath = useDetermineCurrentPath();
  return (
    <div
      onClick={() => handleClickSideMenuItem(link.url)}
      className={`flex flex-row gap-4 ${isCurrentPath ? "bg-white text-[#1E104E]" : "text-white"}   hover:bg-white hover:text-[#1E104E] text-base items-center cursor-pointer rounded-xl p-2.5 font-semibold transition-colors`}
    >
      <i className={`${link.icon} text-3xl`}></i>
      <h1 className="mt-1">{link.name}</h1>
      {isParent && link.subLinks !== undefined && link.subLinks.length > 0 ? (
        <i
          className={` ${isCurrentPath ? "bx bx-chevron-down" : "bx bx-chevron-right"} text-2xl ml-auto mt-1`}
        ></i>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SideMenuOption;
