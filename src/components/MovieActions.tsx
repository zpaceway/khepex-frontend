import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { TMovie } from "../types";
import { FaEye, FaInfoCircle, FaPlay, FaShoppingCart } from "react-icons/fa";

type MovieActionsProps = {
  isPurchased: boolean;
  movie: TMovie;
};

const MovieActions = ({ isPurchased, movie }: MovieActionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start gap-4">
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
      {!isPurchased && (
        <div className="flex flex-col items-start gap-2">
          <div>Watch this movie just once?</div>
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
        </div>
      )}
    </div>
  );
};

export default MovieActions;
