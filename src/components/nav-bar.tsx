"use client";

import { axiosInstance } from "@/app/api/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IGenre {
  id: number;
  name: string;
}

const NavBar = () => {
  const [genre, setGenre] = useState<IGenre[]>([]);

  useEffect(() => {
    axiosInstance
      .get(
        `/genre/movie/list?api_key=65c66cd0f6941151d6b841324cad5808&language=en`
      )
      .then((response) => {
        setGenre(response.data.genres);
      });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-[1640px] mx-auto p-5 flex flex-col gap-10 items-center  ">
        <div className="w-full overflow-hidden">
          <ul className="flex flex-row gap-6">
            <Link href={"/discover/now_playing"}>
              {" "}
              <li>Now playing</li>
            </Link>

            <Link href={"/discover/popular"}>
              <li>Popular</li>
            </Link>
            <Link href={"/discover/top_rated"}>
              <li>TopRated</li>
            </Link>
            <li>Upcoming</li>
          </ul>
        </div>

        <div className="w-full overflow-x-scroll flex flex-row gap-[100px] ">
          {genre.map((item) => (
            <Link key={item.id} href={""}>
              <p key={item.id} className="flex items-center flex-row">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
