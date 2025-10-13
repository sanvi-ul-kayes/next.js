import React from "react";
import Container from "../Layouts/Container";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" bg-black">
      <Container>
        <div className="flex justify-between items-center py-6">
          <div className="text-white">
            <Link href={"/"}>Logo</Link>
          </div>
          <div>
            <ul className="flex gap-5 items-center">
              <li className="text-white">
                <Link href="#">home</Link>
              </li>
              <li className="text-white">
                <Link href="#"></Link>about
              </li>
              <li className="text-white">
                <Link href="#"></Link>service
              </li>
              <li className="text-white">
                {" "}
                <Link href="#"></Link>FAQ
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
