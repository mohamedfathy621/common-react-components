import { motion, AnimatePresence } from "motion/react";
interface CommonDialougeProps {
  sizeType?: "small" | "basic" | "medium" | "large";
  closeDialouge: () => void;
  showDialouge: boolean;
}
//34,30,24,14
//15,20,35,60
function CommonDialouge({
  sizeType,
  closeDialouge,
  showDialouge,
}: CommonDialougeProps) {
  const dimensions = (): { width: string; margin: string } => {
    switch (sizeType) {
      case "small":
        return { width: "w-[15vw]", margin: "ml-[34vw]" };
      case "basic":
        return { width: "w-[20vw]", margin: "ml-[30vw]" };
      case "medium":
        return { width: "w-[35vw]", margin: "ml-[24vw]" };
      case "large":
        return { width: "w-[60vw]", margin: "ml-[14vw]" };
      default:
        return { width: "w-[35vw]", margin: "ml-[24vw]" };
    }
  };
  return (
    <div
      className={`row-start-1 col-start-1 ${showDialouge ? "bg-black/40 z-10" : "bg-transparent z-0"}  bg-black/40 flex z-0`}
    >
      <AnimatePresence>
        {showDialouge && (
          <motion.div
            key={"dialouge-window"}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`mt-[10vh] ${dimensions().margin}`}>
              <div
                className={`fixed flex flex-col min-w-[55vw] md:min-w-[35vw] lg:min-w-0 ${dimensions().width} h-100 p-4 rounded-2xl bg-white border border-slate-500`}
              >
                <div className="flex flex-row items-center">
                  <h1 className="text-base font-semibold mt-0.5">Title</h1>
                  <i
                    onClick={closeDialouge}
                    className="bx bx-x text-slate-500 ml-auto text-xl cursor-pointer"
                  ></i>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default CommonDialouge;
