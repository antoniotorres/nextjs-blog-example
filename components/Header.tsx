import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="text-center py-5">
        <nav>
          <Link href="/" passHref>
            <a className="text-4xl no-underline leading-6 font-medium text-gray-900 hover:text-black focus:outline-none focus:text-gray-900 transition ease-in-out duration-150">
              My Blog
            </a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
