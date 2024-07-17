import "./styles.css";
import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  IoMusicalNote,
  IoPlay,
} from "react-icons/io5";
import { start_ripple } from '../../assets/webkit/ripples';

/**
 * Create AudioControl component
 *
 * @component
 * @param {Object} props - The props of the component
 * @param {Function} set_show_audio_control - Switch audio control visibility
 * @param {Object} current_station - The current station
 * @param {Boolean} show_audio_control - is current radio visibility
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a AudioControl component
 * <AudioControl set_show_audio_control={} current_station={} show_audio_control={} />
 *
 */
export const AudioControl = ({ set_show_audio_control, current_station, show_audio_control }) => {
  const overlay = useRef(null);
  const menu = useRef(null);

  const toggle_menu = ({ mode }) => {
    if(mode == "hide") {
      overlay.current.classList.remove("fade-in");
      overlay.current.classList.add("fade-out");
      menu.current.classList.remove("fade-in");
      menu.current.classList.add("fade-out");
      setTimeout(() => {
        set_show_audio_control(false);
      }, 500)
    } else {
      overlay.current.classList.remove("fade-out");
      overlay.current.classList.add("fade-in");
      menu.current.classList.remove("fade-out");
      menu.current.classList.add("fade-in");
    }
  }

  useEffect(() => {
   if(overlay.current) {
     if(current_station && show_audio_control) {
       toggle_menu({ mode: "show" });
     } else {
       toggle_menu({ mode: "hide" });
     }
   }
  }, [current_station, show_audio_control]);

  if(current_station && show_audio_control) {
    return (
      <>
        <div
          className="w-full h-full overlay-audio-control fixed z-10 flex items-start
          justify-center p-2 absolute top-0 left-0 right-0 bottom-0 sm:hidden sm:block opacity-0"
          ref={overlay}
          onClick={() => toggle_menu({ mode: "hide" })}
        ></div>
        <main
          ref={menu}
          className="sm:sticky w-3/4 top-0 right-0 bottom-0 h-auto sm:w-1/3 gap-10 p-2 z-10 overflow-auto
          rounded-l-lg bg-zinc-100 dark:bg-zinc-800 fade-in absolute"
        >
          <div
            className="w-full h-64 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded-lg overflow-hidden"
          >
            {current_station.favicon ?
              <img
                alt="Logo radio"
                className="w-60 h-60"
                src={current_station.favicon}
              />
              :
              <IoMusicalNote className="text-3xl"/>
            }
          </div>
          <div
            className="w-full h-auto flex items-center justify-center flex-col"
          >
            <h2>{current_station.name}</h2>
            <button
              className="flex items-center justify-center bg-zinc-200
              dark:bg-zinc-700 p-5 rounded-lg wk-rp"
              onPointerDown={(event) => start_ripple(event)}
            >
              <IoPlay />
            </button>
          </div>
          <div>
            <h4>Informações</h4>
            <ul
              className="w-full flex items-center justify-center flex-col gap-2"
            >
              <li
                className="w-full h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2
                flex items-center justify-between text-base"
              >
                <p>Linguagem</p>
                <p>{current_station.language}</p>
              </li>
              <li
                className="w-full h-auto min-h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2
                flex items-center justify-between text-base flex-wrap text-wrap overflow-auto"
              >
                <p>Tags</p>
                <p className="text-balance">{current_station.tags}</p>
              </li>
              <li
                className="w-full h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2
                flex items-center justify-between text-base"
              >
                <p>Votos</p>
                <p>{current_station.votes}</p>
              </li>
            </ul>
            <h4>Localização</h4>
            <ul
              className="w-full flex items-center justify-center flex-col gap-2"
            >
              <li
                className="w-full h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2
                flex items-center justify-between text-base"
              >
                <p>País</p>
                <p>{current_station.country}</p>
              </li>
            </ul>
            <h4>Audio</h4>
            <ul
              className="w-full flex items-center justify-center flex-col gap-2"
            >
              <li
                className="w-full h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2
                flex items-center justify-between text-base"
              >
                <p>Codec</p>
                <p>{current_station.codec}</p>
              </li>
              <li
                className="w-full h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg p-2
                flex items-center justify-between text-base overflow-auto"
              >
                <p>Reprodução</p>
                <a href={current_station.url_resolved} target="_blank">{current_station.name}</a>
              </li>
            </ul>
          </div>
        </main>
      </>
    );
  }
}