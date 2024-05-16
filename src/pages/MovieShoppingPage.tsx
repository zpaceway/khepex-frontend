import { useNavigate, useParams } from "react-router-dom";
import { useUser, useMovie } from "../hooks";
import { useMemo } from "react";
import { toast } from "react-toastify";
import { IoIosFilm } from "react-icons/io";
import NotFoundPage from "./NotFoundPage";
import { Button, LoadingScreen, MovieCard } from "../components";

const MovieShoppingPage = ({ mode }: { mode: "rent" | "buy" }) => {
  const { user, purchase } = useUser();
  const navigate = useNavigate();
  const params = useParams<{ movieId: string }>();
  const movie = useMovie(params.movieId);

  const price = useMemo(() => {
    if (!movie) return;
    return mode === "buy" ? movie.purchasePriceInCents : movie.rentPriceInCents;
  }, [movie, mode]);

  if (movie === undefined) return <LoadingScreen />;
  if (movie === null) return <NotFoundPage />;
  if (!user || price === undefined) return <LoadingScreen />;

  return (
    <div className="flex flex-col bg-white">
      <div className="fixed z-50 flex w-full items-center justify-center border-b bg-zinc-200 px-4 text-zinc-800 backdrop-blur-sm">
        <div className="flex w-full max-w-xl items-center gap-1 p-4">
          <IoIosFilm />
          <h1 className="text-lg font-bold">
            {movie.title} ({movie.year})
          </h1>
        </div>
      </div>
      <div className="flex w-full justify-center pt-16">
        <div className="flex w-full max-w-xl flex-col gap-4 p-4">
          <div>
            Hi {user.name}, thank you for chosing KHEpex. You are about to{" "}
            <span className="font-bold">{mode}</span> the movie
            <span className="font-bold"> {movie.title}</span>. We can guarantee
            you this is a wonderful choice and you will enjoy the movie. Down
            bellow you will find the details of your movie as well as the items
            to proceed with your purchase.
          </div>
          <div className="flex gap-4 border p-4">
            <div className="w-40 shrink-0">
              <MovieCard movie={movie} purchased={false} mode={mode} />
            </div>
            <div className="max-w-xs text-sm">{movie.sinopsis}</div>
          </div>
          <div className="mt-16 flex flex-col gap-4">
            <h1 className="mb-2 text-2xl font-bold">Summary</h1>
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div>
                  {movie.title} - ({movie.year})
                </div>
                <div>${(price / 100).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax (12%)</div>
                <div>${((price / 100) * 0.12).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div className="font-bold">
                  ${((price / 100) * 1.12).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                className="bg-opacity-80 hover:bg-opacity-100"
                variant="primary"
                onClick={async () => {
                  if (mode === "buy") {
                    const result = await purchase(movie.id);
                    if (!result)
                      return toast.error(
                        "An error has ocurred, please try again",
                      );
                    toast.success("Purchase completed");
                    return navigate("/");
                  }
                  toast.success(
                    "Rent completed, you will be redirected to the movie player",
                  );
                  navigate(`/play/${movie.id}`);
                }}
              >
                {mode === "buy" ? "Pay" : "Pay and Watch"}
              </Button>
              <Button
                className="bg-opacity-80 hover:bg-opacity-100"
                variant="info"
                onClick={() => {
                  navigate("/");
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieShoppingPage;
