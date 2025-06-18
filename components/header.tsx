'use client';

import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const HomeHeader: React.FC = () => {
    return(
        <section className="bg-white shadow-md border-b-3 border-green-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black border-l-4 border-green-500 pl-3">Tazkz</h1>
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

export const AboutHeader: React.FC = () => {
    return(
        <section className="bg-white shadow-md border-b-3 border-green-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black border-l-4 border-green-500 pl-3">Tazkz</h1>
                    </div>
                    <div>
                        <nav className="flex items-center space-x-4">
                            <SignedIn>
                                <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                    <Link href='/home'>Home</Link>
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
                                    <Link href='/home'>Home</Link>
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

export const TasksHeader: React.FC = () => {
    return(
        <section className="bg-white shadow-md border-b-3 border-green-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black border-l-4 border-green-500 pl-3">Tasks</h1>
                    </div>
                    <div>
                        <nav className="flex items-center space-x-4">
                            <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                <Link href='/home'>Home</Link>
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                <Link href='/dashboard'>Dashboard</Link>
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                <Link href='/profile'>Profile</Link>
                            </button>
                        </nav> 
                    </div>
                </div>
            </div>
        </section>
    );
};

interface taskHeaderProps{
  taskName: string
}

export const TaskHeader: React.FC<taskHeaderProps> = ({taskName}) => {
    return(
        <section className="bg-white shadow-md border-b-3 border-green-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div>
                        <h1 className="text-2xl font-bold text-black border-l-4 border-green-500 pl-3">
                            Task: <span className="text-green-600">{taskName}</span>
                        </h1>
                    </div>
                    <div>
                        <nav className="flex items-center space-x-4">
                            <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                <Link href="/home">Home</Link>
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                <Link href="/dashboard">Dashboard</Link>
                            </button>
                            <div className="bg-white hover:bg-gray-50 text-black border-2 border-green-500 px-4 py-2 rounded-md transition-all duration-200">
                                <SignOutButton/>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </section>
    );
};
