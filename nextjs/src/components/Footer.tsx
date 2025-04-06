import Image from "next/image";
import React from "react";
import Subscribe from "./Subscribe";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Subscribe />
      <div className="text-center mt-16">
        <p className="text-xs mb-10">&copy; {currentYear} Hardik Vala</p>
        <div className="flex justify-center gap-[100px]">
          <a
            href="https://www.linkedin.com/in/thehardikv"
            aria-label="LinkedIn"
            className="mt-1"
          >
            <Image
              src="/images/linkedin_icon.png"
              alt="LinkedIn"
              width={25}
              height={25}
              className="h-auto"
            />
          </a>
          <a href="https://x.com/TheHardikVala" aria-label="Twitter/X"
          className="text-2xl">
            𝕏
          </a>
          <a
            href="https://bsky.app/profile/hardikvala.com"
            aria-label="BlueSky"
          >
            <Image
              src="/images/bluesky_icon.png"
              alt="BlueSky"
              width={31}
              height={31}
              className="h-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
