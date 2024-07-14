import { useEffect, useState } from "react";
import { get_server_base_url } from "./utils.js";
import { LoaderPage } from "./lib/LoaderPage/index";
import { ErrorPage } from "./lib/ErrorPage/index";
import { MainPage } from './lib/MainPage/index';

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
  const [ current_station, set_current_station ] = useState({});
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
          <MainPage server_url={server_url} set_current_station={set_current_station} />
        </>
      );
    } else {
      return (<ErrorPage/>);
    }
  }
}