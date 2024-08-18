import "./styles.css";
import { useState, useRef, useEffect } from "react";
import { IoMusicalNote, IoPlay, IoStop } from "react-icons/io5";
import { start_ripple } from "../../assets/webkit/ripples";
import { Station } from "../../types/types";

interface MiniAudioControlProps {
  set_show_audio_control(show: boolean): void;
  current_station: Station | null;
  show_audio_control: boolean;
  audio: HTMLAudioElement | null;
}

export const MiniAudioControl: React.FC<MiniAudioControlProps> = ({
  set_show_audio_control,
  current_station,
  show_audio_control,
  audio,
}) => {
  const [audio_state, set_audio_state] = useState<string>("");
  const mini_audio_control = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mini_audio_control.current) {
      if (current_station && !show_audio_control) {
        mini_audio_control.current.classList.remove("show-out");
        mini_audio_control.current.classList.add("show-in");
      } else {
        mini_audio_control.current.classList.remove("show-in");
        mini_audio_control.current.classList.add("show-out");
      }
    }
  }, [current_station, show_audio_control]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("play", () => {
        set_audio_state("playing");
      });
      audio.addEventListener("pause", () => {
        set_audio_state("paused");
      });
    }
  }, [audio]);

  if (current_station && !show_audio_control) {
    return (
      <>
        <div
          className="w-full h-16 flex items-center justify-center fixed
          bottom-0 left-0 right-0 p-2 z-10 overflow-auto rounded-t-lg bg-zinc-100
          dark:bg-zinc-800 show-in sm:hidden shadow-md"
          ref={mini_audio_control}
          onClick={() => set_show_audio_control(true)}
        >
          <div
            className="w-full h-full rounded-lg flex
            items-center justify-center"
          >
            <div className="flex h-full w-24 rounded-lg overflow-hidden items-center justify-center">
              {current_station.favicon ? (
                <img alt="Logo da radio" src={current_station.favicon} />
              ) : (
                <IoMusicalNote className="text-3xl" />
              )}
            </div>
            <div className="flex w-4/5 h-full w-full rounded-lg overflow-hidden items-center justify-center">
              <p className="text-xl text-center w-full sm:w-3/5">
                {current_station.name}
              </p>
            </div>
            <div className="h-full flex w-24 rounded-lg overflow-hidden items-center justify-center">
              <button
                className="h-full w-16 flex items-center justify-center
                rounded-lg bg-zinc-300 dark:bg-zinc-600 wk-rp p-4"
                onPointerDown={(event) => start_ripple(event)}
                onClick={(event) => {
                  event.stopPropagation();
                  audio.paused ? audio.play() : audio.pause();
                }}
              >
                {audio_state == "paused" ? <IoPlay /> : <IoStop />}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};
