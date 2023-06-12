import React from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";

type Props = {
  children: React.ReactNode;
};

const layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <div className="h-screen w-screen relative">
        {/* sidebar */}
        <div className="w-[210px] h-full bg-white absolute border-r z-50 px-2 py-3 shadow-md">
          <div className="text-center h-[100px]">logo</div>
          <div className="flex flex-col gap-1">
            {[1, 2, 3, 4, 6].map((obj, i) => (
              <div
                key={i}
                className={`py-2 px-3 hover:bg-slate-100 cursor-pointer rounded ${
                  i === 0 && "bg-indigo-500 text-white hover:bg-indigo-500"
                }`}
              >
                menu {i + 1}
              </div>
            ))}
          </div>
        </div>
        {/* main layout */}
        <div className="ml-[210px]">
          <div className="w-full px-2 py-3 bg-white shadow-md">
            <div className="flex justify-between gap-3">
              {/* search bar */}
              <div className="relative flex items-center justify-end ">
                <input
                  type="text"
                  className="border rounded-full focus:outline-indigo-500 ps-3 pe-[50px] py-2"
                  placeholder="Search..."
                />
                <div className="absolute z-50  peer flex hover:bg-slate-100 first top-1 right-1 ease-in-out bottom-1 rounded-full cursor-pointer transition-all  items-center px-3">
                  <FiSearch className="peer-hover:text-indigo-500" />
                </div>
              </div>
              {/* other header icons */}
              <div className="flex-1 flex items-center justify-end">
                <div className="h-full hover:bg-slate-100 border border-slate-300 rounded flex items-center px-3 py-2 gap-3 ">
                  Girish Chaudhari <FiChevronDown />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default layout;
