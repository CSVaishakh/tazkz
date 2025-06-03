'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HomeHeader: React.FC = () => {
    return(
        <section className="bg-white shadow-md border-b border-green-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black border-l-4 border-green-500 pl-3">Home</h1>
                    </div>
                    <div>
                        <nav className="flex items-center space-x-4">
                            <SignedIn>
                                <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <Link href='/about'>About</Link>
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <Link href='/dashboard'>Dashboard</Link>
                                </button>
                                <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <Link href='/profile'>Profile</Link>
                                </button>
                                <div className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <SignOutButton/>
                                </div>
                            </SignedIn>
                            <SignedOut>
                                <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <Link href='/about'>About</Link>
                                </button>
                                <div className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <SignInButton/>
                                </div>
                                <div className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <SignUpButton/>
                                </div>
                            </SignedOut>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function Header() {
    const path = usePathname();
    if(path === '/home') return <HomeHeader/>
}