import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMusicalNote,
  IoPlay,
} from "react-icons/io5";
import { start_ripple } from '../../assets/webkit/ripples';
import { Loader } from "../Loader/index";

/**
 * Create StationList component
 *
 * @component
 * @param {Object} props - The props of the component
 * @param {Function} set_current_station - Set the current station
 * @param {String} size - The size of component
 * @param {String} server_url - The server url
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a StationList component
 * <StationList set_current_station={} size={} server_url={}/>
 *
 */
export const StationList = ({ set_current_station, size, server_url }) => {
  const [data, setData] = useState(null);
  const [controller, set_controller] = useState(new AbortController());

  useEffect(() => {
    setData(null);
    if (server_url) {
      controller.abort();
      const new_controler = new AbortController();
      set_controller(new_controler);
      axios.get(server_url,
        { signal: new_controler.signal }
      ).then((response) => {
        setData(response.data);
      })
      return () => new_controler.abort();
    }
  }, [server_url]);

  if (!data && server_url) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center p-2">
          <Loader />
        </div>
      </>
    );
  } else if (!data && !server_url) {
    return (
      <>
        <div className="w-full flex items-center justify-center p-2">
          <p className="text-xl text-center w-full sm:w-3/5">Nada a buscar.</p>
        </div>
      </>
    );
  } else {
    let class_ul = "grid grid-cols-1	md:grid-cols-2 gap-2 p-2";
    if (size == "large") {
      class_ul += " lg:grid-cols-3";
    }
    return (
      <ul className={class_ul}>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              className="h-16 rounded-lg bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center md:basis-1/2 md:shrink p-2"
            >
              <div className="flex h-full w-24 rounded-lg overflow-hidden items-center justify-center">
                {item.favicon ?
                  <img
                    alt="Logo da radio"
                    src={item.favicon}
                  />
                  :
                  <IoMusicalNote className="text-3xl"/>
                }
              </div>
              <div className="flex w-4/5 h-full flex items-center justify-center text-ellipsis overflow-hidden text-nowrap">
                <p className="text-lg text-center w-full sm:w-3/5 text-ellipsis overflow-hidden">{item.name}</p>
              </div>
              <div
                className="h-full flex w-24 rounded-lg overflow-hidden items-center justify-center"
              >
                <button
                  className="h-full w-16 flex items-center justify-center
                  bg-neutral-600 rounded-lg bg-zinc-300 dark:bg-zinc-600 wk-rp"
                  onPointerDown={(event) => start_ripple(event)}
                  onClick={() => set_current_station(item)}
                >
                  <IoPlay />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}