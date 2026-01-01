import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = ({ fullPage = false }) => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center m-4${
        fullPage ? "vh-100" : ""
      }`}
    >
      <AiOutlineLoading3Quarters className="spin text-primary" size={45} />
    </div>
  );
};

export default Loader;
