import React from "react";
// import Layout from "@/layouts/blog";
import '@/styles/global.css';
import '@/styles/index.scss';

type Props = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: Props) => {
  return (
    <div className="">
        {children}
    </div>
  );
};

export default HomeLayout;
