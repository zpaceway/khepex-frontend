import { TMovie } from "../types";
import MovieActions from "./MovieActions";

type MovieBannerProps = {
  movie: TMovie;
  isPurchased: boolean;
};

const MovieBanner = ({ movie, isPurchased }: MovieBannerProps) => {
  return (
    <div className="relative h-full max-h-[max(100vh,600px)] min-h-[max(100vh,600px)] w-full bg-white">
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center gap-4 bg-black bg-opacity-20 px-4 text-white lg:px-8">
        <div className="flex max-w-[400px] gap-2 text-4xl font-bold">
          <div>{movie.title}</div>
        </div>
        <div className="max-w-[400px] text-lg">{movie.description}</div>
        <MovieActions movie={movie} isPurchased={isPurchased} showMoreInfo />
        <div className="absolute inset-x-0 bottom-0 z-10 h-8 bg-gradient-to-t from-zinc-900 to-transparent"></div>
      </div>
      <img
        src={movie.banner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
    </div>
  );
};

export default MovieBanner;
