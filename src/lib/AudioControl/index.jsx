import "./styles.css";
import {
  useState,
  useEffect,
  useRef
} from "react";

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

  useEffect(() => {
   if(overlay.current) {
    if(current_station && show_audio_control) {
      overlay.current.classList.remove("fade-out");
      overlay.current.classList.add("fade-in");
    } else {
      overlay.current.classList.remove("fade-in");
      overlay.current.classList.add("fade-out");
    }
   }
  }, [current_station, show_audio_control]);

  if(current_station && show_audio_control) {
    return (
      <>
        <div
          className="w-full h-full overlay-audio-control fixed z-10 flex items-start
          justify-center p-2 absolute top-0 left-0 right-0 bottom-0"
          ref={overlay}
          onClick={() => set_show_audio_control(false)}
        >
          <main
            className="h-full w-5/6 sm:w-2/5 flex items-center justify-center gap-10 p-2 z-10 overflow-auto
            rounded-l-lg bg-zinc-100 dark:bg-zinc-800 absolute top-0 bottom-0 right-0"
          >
          </main>
        </div>
      </>
    );
  }
}