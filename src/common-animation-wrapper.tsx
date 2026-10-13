import { motion, AnimatePresence } from "motion/react";

interface CommonAnimationWrapper {
  children: React.ReactNode;
  condition?: boolean;
  fade?: boolean;
  scaleOnY?: boolean;
  scaleOnX?: boolean;
  slideOnY?: boolean;
  slideOnX?: boolean;
}
function CommonAnimationWrapper({
  children,
  condition = true,
  fade = true,
  scaleOnX,
  scaleOnY,
  slideOnX,
  slideOnY,
}: CommonAnimationWrapper) {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          initial={{
            opacity: fade ? 0 : 1,
            scaleX: scaleOnX ? 0 : 1,
            scaleY: scaleOnY ? 0 : 1,
            x: slideOnX ? "-100%" : 0,
            y: slideOnY ? "-200%" : 0,
          }}
          animate={{ opacity: 1, scaleX: 1, scaleY: 1, x: 0, y: 0 }}
          exit={{
            opacity: fade ? 0 : 1,
            scaleX: scaleOnX ? 0 : 1,
            scaleY: scaleOnY ? 0 : 1,
            x: slideOnX ? "-100%" : 0,
            y: slideOnY ? "-100%" : 0,
          }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default CommonAnimationWrapper;
