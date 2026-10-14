function FullPageSpinner() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className=" h-[25vh]  aspect-square border-8 border-gray-300 border-t-[#1E104E] border-t-9  rounded-full animate-spin   -translate-y-1/2 text-gray-500 pointer-events-none" />
    </div>
  );
}

export default FullPageSpinner;
