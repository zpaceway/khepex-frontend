import { useMovies } from "../hooks";
import { FaPlay } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";

import LoadingPage from "./LoadingPage";

const DashboardPage = () => {
  const { movies } = useMovies();

  if (!movies) return <LoadingPage />;

  return (
    <div className="flex flex-col bg-zinc-900">
      <div className="fixed top-0 z-50 flex h-16 w-full shrink-0 items-center bg-gradient-to-b from-zinc-900 to-[#00000030] px-4 backdrop-blur-sm lg:px-8">
        <div className="text-3xl font-black text-purple-400">
          <span>KHE</span>
          <span className="text-lg font-medium text-white">pex</span>
        </div>
      </div>
      <div className="relative h-full max-h-[max(100vh,600px)] min-h-[max(100vh,600px)] w-full bg-white">
        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 bg-black bg-opacity-20 px-4 text-white lg:px-8">
          <div className="max-w-[400px] text-4xl font-bold">
            {movies[0].name}
          </div>
          <div className="flex gap-2">
            <button className="gap- 2 flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-zinc-500 hover:bg-opacity-80">
              <FaPlay />
              <div>Play</div>
            </button>
            <button className="gap- 2 flex w-32 items-center justify-center gap-2 rounded-md bg-zinc-700 bg-opacity-60 px-4 py-2 transition-all hover:bg-zinc-500 hover:bg-opacity-80">
              <FaInfoCircle />
              <div>More Info</div>
            </button>
          </div>
        </div>
        <img
          src={movies[0].banner}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      </div>
      <div className="p-4">
        {movies.map((movie) => (
          <div className="flex w-40 flex-col gap-2 overflow-hidden text-white">
            <div className="w-full">
              <img
                src={movie.cover}
                className="h-full w-full object-cover"
                alt=""
              />
            </div>
            <div className="truncate text-sm">{movie.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
