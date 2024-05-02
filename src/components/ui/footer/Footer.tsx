import { titleFont } from "@/config/fonts";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${titleFont.className} antialiased`}>E-commerce</span>
        <span> | SHOP</span>
        <span>© {new Date().getFullYear()}</span>
      </Link>

      <Link href="/privacidad" className="ml-5">
        Privacidad y condiciones
      </Link>
      <Link href="/location" className="ml-5">
        Ubicaciones
      </Link>
    </div>
  );
};
