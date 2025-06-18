"use client";

import React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { HomeHeader } from "@/components/header";

export default function homeLayout() {
    return(
        <section>
            <section>
                <HomeHeader/>
            </section>
            <section className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating circles */}
                    <div className="absolute top-20 left-10 w-4 h-4 bg-green-200 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-green-300 rounded-full animate-pulse opacity-40"></div>
                    <div className="absolute bottom-32 left-20 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-50"></div>
                    <div className="absolute bottom-20 right-10 w-5 h-5 bg-green-200 rounded-full animate-bounce opacity-30" style={{animationDelay: '1s'}}></div>
                    
                    {/* Floating squares */}
                    <div className="absolute top-60 left-1/4 w-8 h-8 bg-green-100 rotate-45 animate-spin opacity-20" style={{animationDuration: '8s'}}></div>
                    <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-green-200 rotate-45 animate-spin opacity-30" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
                    
                    {/* Moving gradient orbs */}
                    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-green-100 to-transparent rounded-full animate-pulse opacity-20"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-l from-green-50 to-transparent rounded-full animate-pulse opacity-15" style={{animationDelay: '3s'}}></div>
                    
                    {/* Animated lines */}
                    <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-green-200 to-transparent animate-pulse opacity-20"></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent animate-pulse opacity-20" style={{animationDelay: '1.5s'}}></div>
                </div>

                <div className="text-center space-y-12 max-w-6xl mx-auto px-6 sm:px-8 relative z-10 py-12">
                    {/* Main Title with animation */}
                    <div className="relative">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black animate-fade-in">
                            Tazkz
                        </h1>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-green-500 animate-bounce"></div>
                    </div>
                    
                    {/* Subtitle */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl text-black font-medium opacity-80">
                        Not the regular task manager
                    </h2>
                    
                    <div className="flex justify-center items-center mt-16 mb-16">
                        {/* Tiles for signed in users */}
                        <SignedIn>
                            <Link href='/tasks'>
                                <div className="w-135 h-75 p-6 border-2 border-black rounded-2xl bg-gradient-to-br from-white via-green-50 to-green-100 hover:scale-105 hover:shadow-2xl hover:border-green-500 hover:bg-gradient-to-br hover:from-green-50 hover:via-green-100 hover:to-green-200 transition-all duration-300 cursor-pointer flex flex-col justify-center items-center group">
                                    <div className="text-center">
                                        <h2 className="text-2xl sm:text-4xl font-bold text-black mb-6 group-hover:text-green-700 transition-colors">Tasks Manager</h2>
                                        <div className="space-y-3 text-gray-700">
                                            <h4 className="text-base sm:text-lg">📋 Prioritize your tasks</h4>
                                            <h4 className="text-base sm:text-lg">📝 Take notes effortlessly</h4>
                                            <h4 className="text-base sm:text-lg">📅 Manage deadlines</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SignedIn>

                        {/* Tiles for signed out users with embedded signin buttons */}
                        <SignedOut>
                            <SignInButton mode="modal">
                                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-80 sm:h-96 p-6 sm:p-8 border-2 border-black rounded-2xl bg-gradient-to-br from-white via-green-50 to-green-100 hover:scale-105 hover:shadow-2xl hover:border-green-500 hover:bg-gradient-to-br hover:from-green-50 hover:via-green-100 hover:to-green-200 transition-all duration-300 cursor-pointer flex flex-col justify-center items-center group">
                                    <div className="text-center">
                                        <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 group-hover:text-green-700 transition-colors">Tasks Manager</h2>
                                        <div className="space-y-3 text-gray-700 mb-4">
                                            <h4 className="text-base sm:text-lg">📋 Prioritize your tasks</h4>
                                            <h4 className="text-base sm:text-lg">📝 Take notes effortlessly</h4>
                                            <h4 className="text-base sm:text-lg">📅 Manage deadlines</h4>
                                        </div>
                                        <div className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium group-hover:bg-green-600 transition-colors">
                                            Click to Sign In
                                        </div>
                                    </div>
                                </div>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    {/* Decorative elements */}
                    <div className="mt-12">
                        <h2 className="text-lg sm:text-xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed">
                            Revolutionize managing your tasks and note taking with Tazkz
                        </h2>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mt-12">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping"></div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </section>
        </section> 
    );
};