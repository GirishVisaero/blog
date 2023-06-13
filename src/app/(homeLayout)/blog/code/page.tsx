import Container from "@/components/Container";
import LatestPosts from "@/components/LatestPosts";
import Link from "next/link";
import React from "react";
import axios from "@/lib/axiosInstance";

type Props = {};

const getData = async () => {
  try {
    let res = await axios.get("/posts");
    return { posts: res.data.posts };
  } catch (err) {
    console.log(err.res);
  }
};

const page = async (props: Props) => {
  const data = await getData();
  console.log(data)
  return (
    <Container
      title="Blog/Code – Ryan Carmody"
      description="Everything code in my life"
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          /blog/code
        </h1>
        <div className="mb-12">
          <p className="mb-3">
            Here you can find articles about everything web dev. I like to write
            &apos;how to&apos;s&apos; about specific topics e.g. Angular 2+,
            Next.js, Heroku etc, as well as broader topics about the life of a
            web developer.
          </p>
          <p>
            You can search{" "}
            <Link href={"/category"} legacyBehavior>
              <a>by category. </a>
            </Link>
          </p>
        </div>
        <h2 className="mb-4">Latest articles</h2>
        <LatestPosts posts={data.posts} />
      </div>
    </Container>
  );
};

export default page;
