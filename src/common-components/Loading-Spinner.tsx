interface LoadingSpinnerProps {
  size?: number;
}

function LoadingSpinner({ size = 8 }: LoadingSpinnerProps) {
  return (
    <div
      style={{ height: size * 4, width: size * 4 }}
      className="  aspect-square border-2 border-gray-300 border-t-[#1E104E] border-t-3  rounded-full animate-spin   -translate-y-1/2 text-gray-500 pointer-events-none"
    />
  );
}
export default LoadingSpinner;
