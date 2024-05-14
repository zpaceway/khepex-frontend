import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

import { TMovie } from "../types";
import { twMerge } from "tailwind-merge";

type MovieCardProps = {
  movie: TMovie;
  onClick: () => void;
  purchased: boolean;
};

const MovieCard = ({ movie, onClick, purchased }: MovieCardProps) => {
  return (
    <div
      className="flex w-40 shrink-0 cursor-pointer flex-col gap-1 overflow-hidden text-white"
      onClick={onClick}
    >
      <div className="relative h-60 w-40 shrink-0">
        <div
          className={twMerge(
            "absolute right-2 top-2 flex items-center gap-1 rounded-full px-2 py-1",
            purchased ? "bg-purple-500" : "bg-emerald-500",
          )}
        >
          <div className="flex items-center gap-1">
            {purchased ? (
              <FaPlay className="shrink-0 text-xs" />
            ) : (
              <FaShoppingCart className="shrink-0 text-xs" />
            )}

            <div className="text-xs">
              {purchased ? "Play" : (movie.priceInCents / 100).toFixed(2)}
            </div>
          </div>
        </div>
        <img
          src={movie.cover}
          className="h-full w-full object-cover shadow-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/no-poster-available.jpg";
          }}
          alt=""
        />
        <div className="absolute inset-x-0 bottom-0 flex h-6 bg-black bg-opacity-50 text-xs backdrop-blur-sm">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-1 px-2 py-1">
              <div className="text-rose-500">
                <FaHeart />
              </div>
              <div>{movie.ratings.toFixed(1)}</div>
            </div>
            <div className="bg-purple-500 bg-opacity-50 px-2 py-1">
              {movie.genres[0]}
            </div>
          </div>
        </div>
      </div>
      <div className="truncate text-sm font-medium">{movie.title}</div>
    </div>
  );
};

export default MovieCard;
