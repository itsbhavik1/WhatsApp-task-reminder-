import React from "react";

const Navbar = () => {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <a className="flex items-center gap-2" href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6"
        >
          <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
        </svg>
        <span className="text-lg font-semibold">Whatsapp Notification Sender</span>
      </a>
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        <a className="hover:underline text-lg " href="#">
          Home
        </a>
        <a className="hover:underline text-lg" href="#">
          About
        </a>
        
      </nav>
      <button class="bg-black text-white p-3 rounded-md">
        Get Started
      </button>
    </header>
  );
};

export default Navbar;
