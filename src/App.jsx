import { useEffect, useState } from "react";
import { LoaderPage } from "./lib/LoaderPage/index";
import { ErrorPage } from "./lib/ErrorPage/index";
import { get_server_base_url } from "./utils.js";

/**
 * Create Application component
 *
 * @component
 * @param {Object} props - The component accepts
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a App component
 * <App/>
 *
 */
export const App = ({}) => {
  const [ server_url, set_server_url ] = useState(null);
  const [ loading_server_url, set_loading_server_url ] = useState(true);

  useEffect(() => {
    get_server_base_url().then((response) => {
      set_server_url(response);
      set_loading_server_url(false);
    });
  }, []);

  if(loading_server_url) {
    return (<LoaderPage/>);
  } else {
    if(server_url) {
      return (
        <>
          Waves
        </>
      );
    } else {
      return (<ErrorPage/>);
    }
  }
}