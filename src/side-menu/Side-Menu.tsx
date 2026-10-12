import type { CommonNavaigationLink } from "../Models/CommonModels";
import SideMenuOptionWrapper from "./Side-Menu-Option-Wrapper";

interface SideMenuProps {
  hideSideMenu: boolean;
  links: CommonNavaigationLink[];
}

function SideMenu({ hideSideMenu, links }: SideMenuProps) {
  return (
    <div
      className={`${hideSideMenu ? "hidden" : "flex"} lg:flex w-70 flex-col py-6 px-4 gap-4 bg-[#1E104E] h-screen font-['Poppins']  no-shrink`}
    >
      <img src="/horizontalWhite.png" className=" mb-8 scale-y-80"></img>
      {links.map((link) => {
        return (
          <SideMenuOptionWrapper
            link={link}
            key={`${link.name}-${link.url}`}
          ></SideMenuOptionWrapper>
        );
      })}
    </div>
  );
}
export default SideMenu;
