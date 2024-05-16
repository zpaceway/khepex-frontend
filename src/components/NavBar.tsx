import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { TUser } from "../types";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextLogo from "./TextLogo";

type NavBarProps = {
  isWindowOnTop?: boolean;
  search?: string;
  onSearchChange?: (newSearch: string) => void;
  user: TUser;
};

const NavBar = ({
  isWindowOnTop,
  search,
  onSearchChange,
  user,
}: NavBarProps) => {
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={twMerge(
        "fixed top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b border-b-white bg-black px-4 backdrop-blur-sm transition-all lg:px-8",
        isWindowOnTop
          ? "border-opacity-0 bg-opacity-50"
          : "border-opacity-20 bg-opacity-80",
      )}
    >
      <TextLogo
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex items-center gap-4 text-white">
        {onSearchChange && (
          <div className="relative text-sm text-zinc-600">
            <FaSearch className="absolute left-2 top-2.5" />
            <input
              type="text"
              className="w-40 min-w-0 rounded-md p-2 pl-8 outline-none"
              placeholder="Title or genre"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
        <div className="relative h-10 w-10">
          <img
            src={user.picture || "/images/users/default.jpg"}
            className="h-full w-full cursor-pointer rounded-full object-cover"
            alt=""
            onClick={() => {
              setIsUserDropdownOpened((state) => !state);
            }}
          />
          {isUserDropdownOpened && (
            <div className="absolute right-0 top-[calc(100%_+_8px)] w-40 rounded-md border bg-white text-zinc-500">
              <button
                className="flex items-center gap-4 px-4 py-2"
                onClick={() => {
                  localStorage.removeItem("currentUserId");
                  navigate("/auth");
                  setIsUserDropdownOpened(false);
                }}
              >
                <div>Sign out</div>
                <FaSignOutAlt />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
