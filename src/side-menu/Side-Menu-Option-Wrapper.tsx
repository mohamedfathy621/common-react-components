import type { CommonNavaigationLink } from "../Models/CommonModels";
import { useMatch } from "react-router";
import SideMenuOption from "./Side-Menu-Option";

interface SideMenuOptionWrapperProps {
  link: CommonNavaigationLink;
}

function SideMenuOptionWrapper({ link }: SideMenuOptionWrapperProps) {
  function useDetermineCurrentPath() {
    const isCurrentPath = useMatch(link.url);
    const isParentPath = useMatch(`${link.url}/*`);
    return isCurrentPath || isParentPath;
  }

  return (
    <>
      <SideMenuOption isParent={true} link={link}></SideMenuOption>
      {useDetermineCurrentPath() !== null && link.subLinks !== undefined ? (
        link.subLinks.map((subLink) => {
          return (
            <div
              className="flex flex-col pl-4  gap-4"
              key={`${subLink.name}-${subLink.url}`}
            >
              <SideMenuOption isParent={false} link={subLink}></SideMenuOption>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
}

export default SideMenuOptionWrapper;
