import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { TUser } from "../types";

type NavBarProps = {
  isWindowOnTop: boolean;
  search: string;
  onSearchChange: (newSearch: string) => void;
  user: TUser;
};

const NavBar = ({
  isWindowOnTop,
  search,
  onSearchChange,
  user,
}: NavBarProps) => {
  return (
    <div
      className={twMerge(
        "fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-b-white bg-black px-4 backdrop-blur-sm transition-all lg:px-8",
        isWindowOnTop
          ? "border-opacity-0 bg-opacity-50"
          : "border-opacity-20 bg-opacity-80",
      )}
    >
      <div className="text-3xl font-black text-purple-400">
        <span>KHE</span>
        <span className="text-lg font-medium text-white">pex</span>
      </div>
      <div className="flex items-center gap-4 text-white">
        <div className="relative text-sm text-zinc-600">
          <FaSearch className="absolute left-2 top-2.5" />
          <input
            type="text"
            className="rounded-md p-2 pl-8 outline-none"
            placeholder="Search by title or genre"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="h-10 w-10">
          <img
            src={user.picture || "/users/default.jpg"}
            className="h-full w-full rounded-full object-cover"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
