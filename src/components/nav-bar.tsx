"use client";

import { axiosInstance } from "@/app/api/api";
import { NAVLINKS } from "@/constants";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";

interface IGenre {
  id: number;
  name: string;
}

const NavBar = () => {
  const [genre, setGenre] = useState<IGenre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

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
    if (params.id) {
      setSelectedGenre(params.id.toString());
    }
  }, [params.id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch("");
    router.push(`/search/${search}`);
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-[1640px] mx-auto p-5 flex flex-col gap-10 items-center  ">
        <div className="w-full overflow-hidden hidden lg:flex">
          <div className="flex flex-row justify-between items-center ">
            <div className="flex flex-row gap-20 items-center py-10 px-5">
              <Link
                href={"/"}
                className={`navLink font-bold hover:bg-gray-700/50 ${
                  pathname === "/" ? "navLinkActive" : ""
                } `}
              >
                Home
              </Link>
              <Link
                href={"/movies"}
                className={`navLink font-bold ${
                  pathname.includes("/movies") ? "navLinkActive" : ""
                }`}
              >
                Movies
              </Link>
            </div>
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

        <div
          className={`w-full overflow-x-scroll flex-row gap-[100px] scrollbar-thin scrollbar-thumb-[#22222a]
            ${pathname.includes("/genre") ? "flex" : "hidden"}`}
        >
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

        {/* mobile */}
        <div className="w-full fixed top-0 left-0 bg-black p-3">
          <div className="flex flex-row justify-between items-center">
            <button onClick={() => setOpen((prev) => !prev)}>
              <IoMenu color="#ffff" size={30} />
            </button>

            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Movie....."
                className=" bg-gray-900 p-2 rounded-lg outline-none"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </form>
          </div>

          <div
            className={`fixed bg-slate-600 w-full h-full top-0 right-0 z-50 mt-[60px] ${
              open ? "" : "hidden"
            }`}
          >
            <div className="p-5 ">
              <ul className="flex flex-col">
                {NAVLINKS.map((item, index) => (
                  <Link
                    href={item.href}
                    className="py-3 hover:bg-slate-600/50 "
                    onClick={() => setOpen(false)}
                    key={index}
                  >
                    {item.title}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
