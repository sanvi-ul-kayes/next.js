"use client";
import React, { useEffect, useState } from "react";
import Container from "./components/Layouts/Container";
import Link from "next/link";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadMore, setLoadMore] = useState(6);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let apiEndPoint = `https://dummyjson.com/posts`;
        if (search) {
          apiEndPoint = `https://dummyjson.com/posts/search?q=${search}`;
        } else if (sort) {
          apiEndPoint = `https://dummyjson.com/posts?sortBy=id&order=${sort}`;
        }
        const response = await fetch(apiEndPoint);

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data.posts);
      } catch (err) {
        setError(err.message);
      } finally {
        // setLoading(false);
      }
    };
    fetchBlogs();
  }, [search, sort]);

  const visibleBlogs = blogs.slice(0, loadMore);
  const hasMoreBlogs = visibleBlogs.length < blogs.length;

  const handleLoadMore = () => {
    setLoadMore((prev) => prev + 3);
  };

  const handleSearchHere = (e) => {
    setSearch(e.target.value);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl font-semibold mb-4">
            Error loading blogs
          </div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  const handleSortToggol = () => {
    setSort((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="flex justify-between">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">All Blogs</h1>
            <p className="text-gray-600 text-lg">
              Explore our collection of {blogs.length} articles
            </p>
          </div>
          <div className="grid justify-center">
            <input
              onChange={handleSearchHere}
              value={search}
              className="border h-10 rounded-2xl bg-white px-5"
              placeholder="Search Here"
            ></input>
            <div>
              Sort :
              <button
                onClick={handleSortToggol}
                className=" text-white hover:shadow-xl cursor-pointer ml-4 border border-blue-50 bg-blue-500 rounded-2xl p-2"
              >
                {sort === "asc" ? "A to Z" : "Z to A"}
              </button>
            </div>
          </div>
        </div>
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blogs available</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {visibleBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col border border-gray-200"
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3 capitalize">
                      {blog.id}. {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{blog.body}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link href={`/blogs/${blog.id}`}>
                      <button className="w-full bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium cursor-pointer">
                        Read more
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {hasMoreBlogs ? (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg transition-colors duration-200 font-medium shadow-sm hover:shadow-md"
                >
                  Load More Articles
                </button>
                <p className="mt-4 text-gray-500 text-sm">
                  Showing {visibleBlogs.length} of {blogs.length} articles
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 font-medium">
                  You have reached the end
                </p>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default BlogsPage;
