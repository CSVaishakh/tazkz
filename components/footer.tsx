'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer () {
  return(
    <section className="bg-white border-t-3 border-green-500 py-6 shadow-lg">
      <section className="container mx-auto px-8 flex justify-between items-center">
        <h1 className="text-2xl md:text-2xl text-black font-bold hover:text-green-600 transition-all duration-300 transform hover:scale-105">
          ©Tazkz 2025
        </h1>
        <nav className="flex space-x-6">
          <Link 
            href="https://x.com/tazkz" 
            className="hover:opacity-80 transition-all duration-300 transform hover:scale-125 hover:rotate-12 p-2 border-2 border-green-500 rounded-full bg-white hover:bg-green-50"
          >
            <Image 
              src={'x.svg'} 
              alt="X" 
              width={20} 
              height={20} 
              className="filter brightness-0 opacity-70 hover:opacity-100 transition-all duration-300" 
            />
          </Link>
          <Link 
            href="https://instagram.com/tzkz" 
            className="hover:opacity-80 transition-all duration-300 transform hover:scale-125 hover:rotate-12 p-2 border-2 border-green-500 rounded-full bg-white hover:bg-green-50"
          >
            <Image 
              src={'instagram.svg'} 
              alt="Instagram" 
              width={20} 
              height={20} 
              className="filter brightness-0 opacity-70 hover:opacity-100 transition-all duration-300" 
            />
          </Link>
        </nav>
      </section>
    </section>
  );
};