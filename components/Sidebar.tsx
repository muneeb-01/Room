"use client";
import React from "react";
import { sidebarLinks } from "@/constants/Sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6 ">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route;
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-4  items-center p-4 rounded-lg justify-start ",
                { "bg-blue-1": isActive }
              )}
            >
              <Image
                width={20}
                height={20}
                src={item.imgUrl}
                alt={item.label}
              />
              <p className="font-semibold text-lg max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
