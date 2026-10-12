import type { CommonNavaigationLink } from "../Models/CommonModels";
import SideMenuOptionWrapper from "./Side-Menu-Option-Wrapper";
import { motion, AnimatePresence } from "motion/react";

interface SideMenuProps {
  hideSideMenu: boolean;
  links: CommonNavaigationLink[];
  animated: boolean;
}

function SideMenu({ hideSideMenu, links, animated }: SideMenuProps) {
  return (
    <AnimatePresence>
      {!hideSideMenu && (
        <motion.div
          key="side-menu"
          initial={{ x: animated ? "-100%" : 0 }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.2 }}
          className="fixed lg:static"
        >
          <div className="flex w-70 flex-col py-6 px-4 gap-4 bg-[#1E104E] h-screen font-['Poppins'] shrink-0">
            <img
              src="/horizontalWhite.png"
              className="mb-8 scale-y-80"
              alt="Logo"
            />

            {links.map((link) => (
              <SideMenuOptionWrapper
                link={link}
                key={`${link.name}-${link.url}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SideMenu;
