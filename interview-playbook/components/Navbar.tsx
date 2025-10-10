import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { FaBookSkull } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <FaBookSkull className="text-4xl" />
        <ThemeToggle animationOrigin="top-right" />
      </div>
    </div>
  );
};

export default Navbar;
