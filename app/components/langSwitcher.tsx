"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const LanguageSwitcher = () => {
  let pathname = usePathname();

  const buttonClass = (lang: string) => {
    if (pathname === null) {
      pathname = "/blogs/en";
    }

    return `
    transition-all duration-200 ease-in-out
    ${
      pathname.endsWith(lang)
        ? "text-zinc-100"
        : "duration-500 text-zinc-500 hover:text-zinc-300"
    }
  `;
  };

  return (
    <div className="flex gap-4">
      <Link href={"/blogs/id"} className={buttonClass("id")}>
        ID
      </Link>
      <Link href={"/blogs/en"} className={buttonClass("en")}>
        EN
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
