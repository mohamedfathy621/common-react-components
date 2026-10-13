interface CommonButtonProps {
  type: "primary" | "secondary" | "dark" | "light" | "cancel";
  children: React.ReactNode;
  onClick: () => void;
  size: "full" | "basic";
}

function CommonButton({ type, children, onClick, size }: CommonButtonProps) {
  const buttonTheme = () => {
    switch (type) {
      case "primary":
        return "bg-[#1E104E]  text-white py-2 px-4 rounded-2xl cursor-pointer hover:text-[#1E104E] hover:bg-white hover:border-2 hover:border-[#1E104E]  transition-colors ";
      case "secondary":
        return "bg-[#450693]  text-white py-2 px-4 rounded-2xl cursor-pointer hover:text-[#450693] hover:bg-white hover:border-2 hover:border-[#450693]  transition-colors ";
      case "dark":
        return "bg-black  text-white py-2 px-4 rounded-2xl cursor-pointer hover:text-black hover:bg-white hover:border-2 hover:border-black  transition-colors ";
      case "cancel":
        return " bg-rose-600  text-white border py-2 px-4 rounded-2xl cursor-pointer hover:text-rose-600 hover:bg-white hover:border-2 hover:border-rose-600  transition-colors ";
      case "light":
        return "bg-white  text-[#450693] border py-2 px-4 rounded-2xl cursor-pointer hover:text-black hover:bg-white hover:border-2 hover:border-black  transition-colors ";
    }
  };
  const buttonSize = size === "full" ? "w-full" : "w-fit min-w-24";
  return (
    <button className={buttonTheme() + " " + buttonSize} onClick={onClick}>
      {children}
    </button>
  );
}
export default CommonButton;
