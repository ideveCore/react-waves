import { useEffect, useState } from "react";
import { get_server_base_url } from "./utils.js";
import { LoaderPage } from "./lib/LoaderPage/index";
import { ErrorPage } from "./lib/ErrorPage/index";
import { MainPage } from './lib/MainPage/index';
import { AudioControl } from "./lib/AudioControl/index";
import { MiniAudioControl } from "./lib/MiniAudioControl/index";

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
  const [ current_station, set_current_station ] = useState(null);
  const [ loading_server_url, set_loading_server_url ] = useState(true);
  const [show_audio_control, set_show_audio_control] = useState(false);

  useEffect(() => {
    get_server_base_url().then((base_uri) => {
      set_server_url(base_uri);
      set_loading_server_url(false);
    }).catch((error) => {
      set_server_url(base_uri);
      set_loading_server_url(false);
    });
  }, []);

  useEffect(() => {
    if(current_station) {
      set_show_audio_control(true);
    } else {
      set_show_audio_control(false);
    }
  }, [current_station]);

  if(loading_server_url) {
    return (<LoaderPage/>);
  } else {
    if(server_url) {
      return (
        <>
          <MainPage server_url={server_url} set_current_station={set_current_station} />
          <AudioControl
            set_show_audio_control={set_show_audio_control}
            current_station={current_station}
            show_audio_control={show_audio_control}
          />
          <MiniAudioControl
            set_show_audio_control={set_show_audio_control}
            current_station={current_station}
            show_audio_control={show_audio_control}
          />
        </>
      );
    } else {
      return (<ErrorPage/>);
    }
  }
}