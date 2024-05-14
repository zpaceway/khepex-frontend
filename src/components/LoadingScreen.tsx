import { CgSpinner } from "react-icons/cg";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-zinc-800">
      <CgSpinner className="animate-spin text-4xl text-white" />
    </div>
  );
};

export default LoadingScreen;
