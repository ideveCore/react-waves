import "./styles.css";
import ErrorIcon from "../../assets/error_icon.svg";
import { IoReload } from "react-icons/io5";
import { start_ripple } from '../../assets/webkit/ripples';

/**
 * Create ErrorPage component
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a ErrorPage component
 * <ErrorPage/>
 *
 */
export const ErrorPage = ({}) => {
  return (
    <>
      <div
        className="w-full w-full flex items-center justify-center flex-col gap-3 p-2"
      >
        <img
          src={ErrorIcon}
          className='w-5/6 sm:w-96'
          alt="Ilustração de erro"
        />
        <h2 className="text-slate-800 dark:text-slate-300">Erro!</h2>
        <p
          className="text-xl text-center w-full sm:w-3/5"
        >
          😔 Desculpe, não conseguimos encontrar um servidor de rádio no momento.
          Tente novamente mais tarde.
        </p>
        <button
          className="flex items-center justify-center bg-zinc-300 dark:bg-zinc-600 p-2 rounded-full gap-2 text-xl wk-rp"
          onPointerDown={(event) => start_ripple(event)}
          onClick={() => window.location.reload()}
        >
          <IoReload/>
          Recarregar
        </button>
      </div>
    </>
  );
}