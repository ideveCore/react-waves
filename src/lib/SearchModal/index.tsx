import "./styles.css";
import { StationList } from "../StationList/index";
import { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { start_ripple } from "../../assets/webkit/ripples";
import { Station } from "../../types/types";

interface SearchModalProps {
  set_show_search_modal(show: boolean): void;
  set_current_station(station: Station): void;
  server_url: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  set_show_search_modal,
  set_current_station,
  server_url,
}) => {
  const [search_url, set_search_url] = useState<string>("");
  const [search_type, set_search_type] = useState<string>("name");
  const input_search = useRef<HTMLInputElement>(null);
  const overlay_ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        className="w-full h-full overlay-modal fixed z-10 flex items-start justify-center p-2 fade-in"
        ref={overlay_ref}
      >
        <div
          className="flex items-center justify-center flex-col bg-zinc-100
          dark:bg-zinc-800 rounded-lg w-full max-h-full sm:w-5/6 md:w-2/3
          lg:w-1/2 p-2 gap-3"
        >
          <header className="w-full flex items-center justify-between">
            <div className="w-5/6 flex items-center justify-center gap-2">
              <input
                type="search"
                placeholder="O que você deseja ouvir?"
                className="w-2/3 rounded-full p-3 bg-zinc-200 dark:bg-zinc-700"
                ref={input_search}
                onInput={(event: any) => {
                  const value = event.target.value.trim();
                  if (value) {
                    set_search_url(
                      encodeURI(
                        `${server_url}/json/stations/search?${search_type}=${event.target.value.trim()}`,
                      ),
                    );
                  } else {
                    set_search_url("");
                  }
                }}
              />
              <select
                className="w-1/3 rounded-full p-3 bg-zinc-200 dark:bg-zinc-700"
                onChange={({ target }) => {
                  set_search_type(target.value);
                  if (input_search.current) {
                    set_search_url(
                      encodeURI(
                        `${server_url}/json/stations/search?${target.value}=${input_search.current.value.trim()}`,
                      ),
                    );
                  }
                }}
              >
                <option value="name" selected>
                  Nome
                </option>
                <option value="language">Linguagem</option>
                <option value="country">País</option>
              </select>
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full
              bg-zinc-200 dark:bg-zinc-700 wk-rp"
              onPointerDown={(event: any) => start_ripple(event)}
              onClick={() => {
                set_show_search_modal(false);
              }}
            >
              <IoClose />
            </button>
          </header>
          <main className="w-full max-h-full overflow-auto">
            <StationList
              size="normal"
              server_url={search_url}
              set_current_station={set_current_station}
              set_show_search_modal={set_show_search_modal}
            />
          </main>
        </div>
      </div>
    </>
  );
};
