import "./styles.css";
import { Loader } from "../Loader/index";

export const LoaderPage: React.FC = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center flex-col gap-10">
        <Loader size="large" />
        <p className="text-xl text-center w-full sm:w-3/5">
          🔍 Procurando o melhor servidor disponível...
        </p>
      </div>
    </>
  );
};
