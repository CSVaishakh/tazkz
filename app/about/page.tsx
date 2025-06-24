import { AboutHeader } from "@/components/header";
import React from "react";

export default function AboutLayout(){
    return(
        <section>
            <section>
                <AboutHeader/>
            </section>
            <section className="min-h-screen bg-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Floating circles with enhanced animations */}
                    <div className="absolute top-20 left-10 w-4 h-4 bg-green-200 rounded-full animate-bounce opacity-60"></div>
                    <div className="absolute top-40 right-20 w-6 h-6 bg-green-300 rounded-full animate-pulse opacity-40"></div>
                    <div className="absolute bottom-32 left-20 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-50"></div>
                    <div className="absolute bottom-20 right-10 w-5 h-5 bg-green-200 rounded-full animate-bounce opacity-30" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-32 left-1/2 w-2 h-2 bg-green-300 rounded-full animate-pulse opacity-40" style={{animationDelay: '2.5s'}}></div>
                    <div className="absolute bottom-40 left-1/3 w-4 h-4 bg-green-200 rounded-full animate-bounce opacity-50" style={{animationDelay: '1.8s'}}></div>
                    
                    {/* Floating squares with varied speeds */}
                    <div className="absolute top-60 left-1/4 w-8 h-8 bg-green-100 rotate-45 animate-spin opacity-20" style={{animationDuration: '8s'}}></div>
                    <div className="absolute bottom-60 right-1/4 w-6 h-6 bg-green-200 rotate-45 animate-spin opacity-30" style={{animationDuration: '6s', animationDelay: '2s'}}></div>
                    <div className="absolute top-96 right-1/3 w-5 h-5 bg-green-150 rotate-45 animate-spin opacity-25" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
                    
                    {/* Moving gradient orbs with floating animation */}
                    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-gradient-to-r from-green-100 to-transparent rounded-full animate-pulse opacity-20"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-40 h-40 bg-gradient-to-l from-green-50 to-transparent rounded-full animate-pulse opacity-15" style={{animationDelay: '3s'}}></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-100 to-transparent rounded-full animate-pulse opacity-18" style={{animationDelay: '4s'}}></div>
                    
                    {/* Animated lines with wave effect */}
                    <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-green-200 to-transparent animate-pulse opacity-20"></div>
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-200 to-transparent animate-pulse opacity-20" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-100 to-transparent animate-pulse opacity-15" style={{animationDelay: '2.5s'}}></div>
                    <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-100 to-transparent animate-pulse opacity-15" style={{animationDelay: '3.5s'}}></div>
                </div>

                {/* Enhanced Banner Section */}
                <div className="relative z-10 text-center py-32 mb-16">
                    <div className="relative">
                        <h1 className="text-6xl md:text-8xl font-bold text-black animate-pulse">
                            Tazkz
                        </h1>
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-green-500 animate-bounce"></div>
                    </div>
                    <h3 className="text-2xl md:text-3xl text-black font-medium mt-12 animate-fade-in">
                        Not the regular task manager
                    </h3>
                    <div className="flex justify-center space-x-2 mt-8">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.3s'}}></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.6s'}}></div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-6xl mx-auto px-4 pb-20 relative z-10">
                    {/* About Section - Enhanced */}
                    <div className="mb-16 p-12 border-3 border-black rounded-xl bg-gradient-to-br from-white via-green-50 to-green-100 hover:shadow-xl hover:border-green-500 transition-all duration-300 hover:scale-105">
                        <div className="text-center mb-8">
                            <h3 className="text-4xl font-bold text-black mb-6 border-l-4 border-green-500 pl-4 inline-block">
                                About Tazkz
                            </h3>
                            <div className="w-16 h-1 bg-green-500 mx-auto"></div>
                        </div>
                        <div className="space-y-6">
                            <p className="text-gray-800 leading-relaxed text-lg text-center max-w-4xl mx-auto">
                                Tazkz is more than just another to-do list — it&apos;s a reimagined space where tasks and thoughts come together. Whether you&apos;re organizing your day, brainstorming ideas, or planning long-term goals, Tazkz gives you the tools to capture, track, and act — all in one intuitive interface.
                            </p>
                        </div>
                    </div>

                    {/* Why Tazkz Section - Enhanced */}
                    <div className="mb-16 p-12 border-3 border-black rounded-xl bg-gradient-to-br from-white via-green-50 to-green-100 hover:shadow-xl hover:border-green-500 transition-all duration-300 hover:scale-105">
                        <div className="text-center mb-8">
                            <h3 className="text-4xl font-bold text-black mb-6 border-l-4 border-green-500 pl-4 inline-block">
                                🧠 Why Tazkz?
                            </h3>
                            <div className="w-16 h-1 bg-green-500 mx-auto"></div>
                        </div>
                        <p className="text-gray-800 leading-relaxed text-lg text-center max-w-4xl mx-auto">
                            We believe productivity isn&apos;t just about checking off boxes — it&apos;s about clarity, focus, and flow. Traditional task managers silo your ideas from your action items. Tazkz breaks that wall, combining note-taking and task management into a single, powerful workflow.
                        </p>
                    </div>

                    {/* Features Section - Enhanced */}
                    <div className="mb-16 p-12 border-3 border-black rounded-xl bg-gradient-to-br from-white via-green-50 to-green-100 hover:shadow-xl hover:border-green-500 transition-all duration-300 hover:scale-105">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-bold text-black mb-6 border-l-4 border-green-500 pl-4 inline-block">
                                ✨ What Makes It Different?
                            </h3>
                            <div className="w-16 h-1 bg-green-500 mx-auto"></div>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <li className="flex items-start space-x-4 p-6 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <div className="w-4 h-4 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                                <div>
                                    <span className="font-semibold text-black text-lg">Unified Interface:</span>
                                    <p className="text-gray-800 mt-2">Tasks and notes live side-by-side. No more jumping between apps.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4 p-6 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <div className="w-4 h-4 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                <div>
                                    <span className="font-semibold text-black text-lg">Contextual Clarity:</span>
                                    <p className="text-gray-800 mt-2">Link notes to tasks for deeper insight and better execution.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4 p-6 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <div className="w-4 h-4 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                <div>
                                    <span className="font-semibold text-black text-lg">Smart Design:</span>
                                    <p className="text-gray-800 mt-2">Clean, minimalist, and distraction-free — designed to keep you focused.</p>
                                </div>
                            </li>
                            <li className="flex items-start space-x-4 p-6 bg-white rounded-lg border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 hover:scale-105">
                                <div className="w-4 h-4 bg-green-500 rounded-full mt-2 flex-shrink-0 animate-pulse" style={{animationDelay: '0.6s'}}></div>
                                <div>
                                    <span className="font-semibold text-black text-lg">Custom Workflows:</span>
                                    <p className="text-gray-800 mt-2">Whether you&apos;re a student, professional, or creative, Tazkz adapts to your style.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Enhanced Decorative elements */}
                    <div className="flex justify-center space-x-4 mt-20">
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-4 h-4 bg-green-500 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
                    </div>
                </div>
            </section>
        </section>
    );
};