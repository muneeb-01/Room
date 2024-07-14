import React from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between fixed z-50 w-full bg-dark-1  px-6 py-4 lg:px:10">
      <Link href="/" className="flex gap-3 items-center">
        <Image
          src="/icons/logo.svg"
          alt="Room Logo"
          width={32}
          height={32}
          className=" max-sm:size-10"
        ></Image>
        <p className="text-[26px] font-extrabold max-sm:hidden text-white">
          Room
        </p>
      </Link>

      <div className="flex justify-between items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
