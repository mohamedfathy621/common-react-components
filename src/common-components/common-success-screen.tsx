import { useNavigate } from "react-router";
import CommonButton from "./common-button";

interface CommonSuccessScreenProps {
  successText: string;
  redirectText: string;
  redirectUrl: string;
}
function CommonSuccessScreen({
  successText,
  redirectText,
  redirectUrl,
}: CommonSuccessScreenProps) {
  const submitNavigator = useNavigate();
  return (
    <div className="row-start-1 col-start-1 h-full w-full  z-10 flex flex-col items-center justify-start pt-[20vh] ">
      <img src="horizontalNoBG.png" className=" w-[30vh] mr-4"></img>
      <h1 className="text-2xl mt-10 mb-5 text-[#1E104E] font-semibold">
        {successText}
      </h1>
      <CommonButton
        type="primary"
        size="basic"
        onClick={() => submitNavigator(redirectUrl)}
      >
        {redirectText}
      </CommonButton>
    </div>
  );
}
export default CommonSuccessScreen;
