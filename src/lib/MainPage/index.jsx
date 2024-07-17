import "./styles.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { IoSearch } from "react-icons/io5";
import { start_ripple } from '../../assets/webkit/ripples';
import { SearchModal } from "../SearchModal/index";
import { StationList } from "../StationList/index";

/**
 * Create MainPage component
 *
 * @component
 * @param {Object} props - The props of the component
 * @param {Function} set_current_station - Set the current station
 * @param {String} server_url - The sserver url
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * // Render a MainPage component
 * <MainPage set_current_station={} server_url={}/>
 *
 */
export const MainPage = ({ set_current_station, server_url }) => {
  const [show_search_modal, set_show_search_modal] = useState(false);

  return (
    <>
      <section className="flex w-2/3 h-full items-center justify-start flex-col gap-10 flex-1 overflow-auto">
        <header className="flex w-full p-2">
          <div className="c-slider rounded-lg p-2 bg-indigo-500 w-full h-44 relative">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full
                bg-indigo-400 z-10 end-2 wk-rp light absolute text-white"
              onPointerDown={(event) => start_ripple(event)}
              onClick={() => set_show_search_modal(true)}
            >
              <IoSearch />
            </button>
            <Swiper
              className="w-full h-full flex item-center justify-center"
              pagination={{
                dynamicBullets: true,
              }}
              navigation={true}
              modules={[Navigation, Pagination]}
            >
              <SwiperSlide className="flex items-center justify-center flex-wrap p-10">
                <h4 class="text-white text-wrap text-center text-xl">Navegue por mais de 30.000 estações de rádio</h4>
              </SwiperSlide>
              <SwiperSlide className="">
                <div className="w-full h-32 flex items-center justify-center flex-col gap-2 p-2">
                  <h4 class="text-white text-wrap text-center text-xl">Fornecido por radio-browser.info</h4>
                  <a
                    href="https://www.radio-browser.info/"
                    target="_blank"
                    className="bg-indigo-400 text-white p-2 px-4 rounded-full wk-rp light text-lg"
                    onPointerDown={(event) => start_ripple(event)}
                  >
                    Abrir site
                  </a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </header>
        <main className="w-full pb-20">
          <div
            className="sticky top-0 p-2 w-full flex items-center justify-start
            z-10 bg-zinc-100 dark:bg-zinc-800"
          >
            <h4>Mais votadas</h4>
          </div>
          <StationList
            server_url={`${server_url}/json/stations/topvote/12`}
            size="large"
            set_current_station={set_current_station}
          />
          <div
            className="sticky top-0 p-2 w-full flex items-center justify-start
            z-10 bg-zinc-100 dark:bg-zinc-800"
          >
            <h4>Em alta</h4>
          </div>
          <StationList
            server_url={`${server_url}/json/stations/topclick/12`}
            size="large"
            set_current_station={set_current_station}
          />
          <div
            className="sticky top-0 p-2 w-full flex items-center justify-start
            z-10 bg-zinc-100 dark:bg-zinc-800">
            <h4>Radios recentes</h4>
          </div>
          <StationList
            server_url={`${server_url}/json/stations/lastchange/12`}
            size="large"
            set_current_station={set_current_station}
          />
        </main>
        {show_search_modal &&
          <SearchModal
            set_show_search_modal={set_show_search_modal}
            set_current_station={set_current_station}
            server_url={server_url}
          />
        }
      </section>
    </>
  );
}