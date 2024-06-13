"use client";

import { axiosInstance } from "@/app/api/api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IGenre {
  id: number;
  name: string;
}

const NavBar = () => {
  const [genre, setGenre] = useState<IGenre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [search, setSearch] = useState("");

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    axiosInstance
      .get(
        `/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en`
      )
      .then((response) => {
        setGenre(response.data.genres);
      });
  }, []);

  useEffect(() => {
    setSelectedGenre(params.id.toString());
  }, [params.id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-[1640px] mx-auto p-5 flex flex-col gap-10 items-center  ">
        <div className="w-full overflow-hidden">
          <div className="flex flex-row justify-between items-center ">
            <ul className="flex flex-row gap-6">
              <Link href={"/discover/now_playing"}>
                <li
                  className={`navLink ${
                    selectedGenre === "now_playing" ? "navLinkActive" : ""
                  }`}
                >
                  Now playing
                </li>
              </Link>

              <Link href={"/discover/popular"}>
                <li
                  className={`navLink ${
                    selectedGenre === "popular" ? "navLinkActive" : ""
                  }`}
                >
                  Popular
                </li>
              </Link>
              <Link
                className={`navLink ${
                  selectedGenre === "top_rated" ? "navLinkActive" : ""
                }`}
                href={"/discover/top_rated"}
              >
                <li>Top Rated</li>
              </Link>

              <Link
                className={`navLink ${
                  selectedGenre === "upcoming" ? "navLinkActive" : ""
                }`}
                href={"/discover/upcoming"}
              >
                <li>Upcoming</li>
              </Link>
            </ul>

            <div className="flex flex-row items-center gap-3">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search Movie....."
                  className="bg-gray-900 p-2 rounded-lg outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </form>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-scroll flex flex-row gap-[100px] scrollbar-thin scrollbar-thumb-[#22222a]  ">
          {genre.map((item) => (
            <Link
              key={item.id}
              href={`/genre/${item.id}?genre=${item.name.toLocaleLowerCase()}`}
            >
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
