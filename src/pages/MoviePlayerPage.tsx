import { useParams } from "react-router-dom";
import { useMovie, useUser } from "../hooks";
import LoadingScreen from "../components/LoadingScreen";
import ReactPlayer from "react-player";
import NotFoundPage from "./NotFoundPage";
import NavBar from "../components/NavBar";

const MoviePlayerPage = () => {
  const { user } = useUser();
  const params = useParams<{ movieId: string }>();
  const movie = useMovie(params.movieId);

  if (movie === undefined || !user) return <LoadingScreen />;
  if (movie === null) return <NotFoundPage />;

  return (
    <div className="fixed inset-0 flex flex-col bg-zinc-900">
      <NavBar user={user} />
      <div className="h-full w-full pt-16">
        <ReactPlayer
          className="h-full w-full"
          width={"100%"}
          height={"100%"}
          controls
          url={movie?.trailer}
        />
      </div>
    </div>
  );
};

export default MoviePlayerPage;
