import { useEffect, useState } from "react";
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
  const [ loading_server_url, set_loading_server_url ] = useState(null);

  useEffect(() => {
    get_server_base_url().then((response) => {
      set_server_url(response);
      set_loading_server_url(false);
    });
  }, []);

  return (
    <>
      <h1>Waves</h1>
    </>
  );
}