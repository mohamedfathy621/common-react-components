interface NotificationContainerProps {
  top?: boolean;
  right?: boolean;
  children: React.ReactNode;
}

function NotificationContainer({
  top = false,
  right = false,
  children,
}: NotificationContainerProps) {
  return (
    <div
      className={`w-fit h-fit ${top ? "top-20" : "bottom-20"} ${right ? "right-5" : ""}  fixed flex flex-col gap-4 pb-3`}
    >
      {children}
    </div>
  );
}
export default NotificationContainer;
