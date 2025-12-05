import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PlusCircleIcon, RectangleStackIcon } from "@heroicons/react/24/outline";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">

      <Link
  to="/"
  className="flex items-center gap-2 font-semibold text-2xl tracking-tight text-gray-900 group"
>
  <SparklesIcon
    className="h-7 w-7 text-[#007AFF] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
  />
  TinyLink
</Link>



        <div className="flex items-center space-x-8 text-lg">

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive
                  ? "text-[#007AFF]"
                  : "text-gray-700 hover:text-[#007AFF]"
              }`
            }
          >
            <PlusCircleIcon className="h-5 w-5" />
            Create
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 transition-colors ${
                isActive
                  ? "text-[#007AFF]"
                  : "text-gray-700 hover:text-[#007AFF]"
              }`
            }
          >
            <RectangleStackIcon className="h-5 w-5" />
            Dashboard
          </NavLink>

        </div>
      </div>
    </nav>
  );
}


