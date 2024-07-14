import React from "react";
import Image from "next/image";

type HOME_CARD_PROPS = {
  img: string;
  title: string;
  description: string;
  color: string;
  handleClick: () => void;
};

const HomeCard = ({
  img,
  title,
  description,
  handleClick,
  color,
}: HOME_CARD_PROPS) => {
  return (
    <div
      className={`${color} px-4 py-6 flex flex-col justify-between w-full min-h-[260px] rounded-[14px] cursor-pointer`}
      onClick={handleClick}
    >
      <div className="flex justify-center items-center glasmorphism rounded-[10px] size-12">
        <Image src={img} alt="meeting" width={27} height={27}></Image>
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
