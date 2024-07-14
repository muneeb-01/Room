"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants/Sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Humberger"
            className=" sm:hidden cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent side="left" className=" border-none  bg-dark-1">
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
          <SheetClose asChild>
            <section className="flex  h-full flex-col gap-6 pt-16 text-white">
              <div className="flex flex-1 flex-col gap-6 ">
                {sidebarLinks.map((item) => {
                  const isActive = pathname === item.route;
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-4  items-center p-4 rounded-lg justify-start max-w-60",
                          { "bg-blue-1": isActive }
                        )}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={item.imgUrl}
                          alt={item.label}
                        />
                        <p className="font-medium text-base">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </section>
          </SheetClose>

          <div className="flex h-[calc(100vh-72px)]"></div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
