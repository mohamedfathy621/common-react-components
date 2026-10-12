interface NavBarProps {
  hideSideMenu: boolean;
  setHideSideMenu: (value: React.SetStateAction<boolean>) => void;
  leftSection?: React.ReactNode;
  middleSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}
function NavBar({
  hideSideMenu,
  setHideSideMenu,
  leftSection,
  middleSection,
  rightSection,
}: NavBarProps) {
  return (
    <div
      className={`flex flex-row h-17 py-3.5 px-8 ${hideSideMenu ? "bg-white" : " bg-transparent"} lg:bg-white`}
    >
      <i
        className="bx bx-menu text-2xl my-auto cursor-pointer mr-8 font-bold  lg:invisible"
        onClick={(e) => {
          e.stopPropagation();
          setHideSideMenu((value) => !value);
        }}
      ></i>
      {leftSection}
      {middleSection}
      {rightSection}
    </div>
  );
}

export default NavBar;
