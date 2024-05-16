import { useNavigate } from "react-router-dom";
import { TMovie } from "../types";
import { FaEye, FaInfoCircle, FaPlay, FaShoppingCart } from "react-icons/fa";
import Button from "./Button";

type MovieBannerProps = {
  movie: TMovie;
  isPurchased: boolean;
};

const MovieBanner = ({ movie, isPurchased }: MovieBannerProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative h-full max-h-[max(100vh,600px)] min-h-[max(100vh,600px)] w-full bg-white">
      <div className="absolute inset-0 z-10 flex flex-col items-start justify-center gap-4 bg-black bg-opacity-20 px-4 text-white lg:px-8">
        <div className="flex max-w-[400px] gap-2 text-4xl font-bold">
          <div>{movie.title}</div>
        </div>
        <div className="max-w-[400px] text-lg">{movie.description}</div>
        <div className="flex gap-2">
          <Button
            className="bg-opacity-70 backdrop-blur-sm hover:bg-opacity-90"
            variant={isPurchased ? "primary" : "secondary"}
            onClick={() => {
              if (isPurchased) {
                return navigate(`/play/${movie.id}`);
              }
              navigate(`/buy/${movie.id}`);
            }}
          >
            <div className="flex items-center gap-1">
              {isPurchased ? (
                <FaPlay className="shrink-0" />
              ) : (
                <FaShoppingCart className="shrink-0" />
              )}

              <div className="">
                {isPurchased
                  ? "Play"
                  : (movie.purchasePriceInCents / 100).toFixed(2)}
              </div>
            </div>
          </Button>
          <Button
            className="bg-opacity-70 backdrop-blur-sm hover:bg-opacity-90"
            variant="info"
            onClick={() => {
              navigate(`/movie/${movie.id}`);
            }}
          >
            <div className="flex items-center gap-2">
              <FaInfoCircle />
              <div className="whitespace-nowrap">More Info</div>
            </div>
          </Button>
        </div>
        <div className="flex flex-col items-start gap-2">
          <div>Watch this movie just once?</div>
          {!isPurchased && (
            <div className="flex flex-col">
              <Button
                className="bg-opacity-70 backdrop-blur-sm hover:bg-opacity-90"
                variant="secondary"
                onClick={() => {
                  navigate(`/rent/${movie.id}`);
                }}
              >
                <div className="flex items-center gap-1">
                  <FaEye className="shrink-0" />
                  <div className="">Rent</div>
                </div>
              </Button>
            </div>
          )}
        </div>
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
