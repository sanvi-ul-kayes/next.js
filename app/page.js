"use client";
import React, { useEffect, useState } from "react";
import Container from "./components/Layouts/Container";
import Link from "next/link";

const page = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setBlogs(data.posts));
  }, []);
  const visibleData = blogs.slice(0, loadMore);
  const handleLoadMore = () => {
    setLoadMore((prev) => prev + 3);
  };

  return (
    <div>
      <Container>
        <button className="text-2xl font-bold cursor-pointer">All Blog</button>
        <div className="grid grid-cols-3 space-x-5 space-y-5">
          {visibleData.map((blog) => (
            <div className="border p-5">
              <h1>{blog.title}</h1>
              <h2>{blog.body}</h2>
              <Link href={`/blogs/${blog.id}`}>
                <button className="text-white bg-black mt-3 p-2 rounded-2xl cursor-pointer">
                  Read more
                </button>
              </Link>
            </div>
          ))}
        </div>
        {visibleData.length == blogs.length ? (
          "R nai"
        ) : (
          <div className="my-6 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-black text-white p-4 rounded-2xl cursor-pointer"
            >
              Load more
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default page;
