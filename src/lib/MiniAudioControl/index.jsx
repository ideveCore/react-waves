import "./styles.css";
import {
  useRef,
  useEffect
} from "react";

/**
 * Create MiniAudioControl component
 *
 * @component
 * @param {Object} props - The props of the component
 * @param {Function} set_show_audio_control - Switch audio control visibility
 * @param {Object} current_station - The current station
 * @param {Boolean} show_audio_control - is current radio visibility
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a MiniAudioControl component
 * <MiniAudioControl set_show_audio_control={} current_station={} show_audio_control={} />
 *
 */
export const MiniAudioControl = ({ set_show_audio_control, current_station, show_audio_control, }) => {
  const mini_audio_control = useRef(null);

  useEffect(() => {
   if(mini_audio_control.current) {
    if(current_station && !show_audio_control) {
      mini_audio_control.current.classList.remove("show-out");
      mini_audio_control.current.classList.add("show-in");
    } else {
      mini_audio_control.current.classList.remove("show-in");
      mini_audio_control.current.classList.add("show-out");
    }
   }
  }, [current_station, show_audio_control]);


  if(current_station && !show_audio_control) {
    return (
      <>
        <div
          className="w-full h-16 flex items-center justify-center fixed
          bottom-0 left-0 right-0 p-2 z-10 overflow-auto rounded-t-lg bg-zinc-100
          dark:bg-zinc-800 show-in"
          ref={mini_audio_control}
        >
        </div>
      </>
    );
  }
}