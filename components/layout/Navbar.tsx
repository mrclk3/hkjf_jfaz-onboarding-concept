"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ExternalLink } from "lucide-react";
import { navigationItems } from "@/data/navigationData";

export function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f9f5eb] border-t-4 border-[#dd0a35] shadow-xs">
      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand / Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 py-2">
            <div className="relative w-44 h-12 sm:w-52 sm:h-14 flex items-center">
              <Image
                src="/assets/hkjf_logo.png"
                alt="Hessische Kinder- und Jugendfeuerwehr"
                width={208}
                height={56}
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navigationItems.map((item) => {
              const isStart = item.title === "Start";
              const isDropdownOpen = activeDropdown === item.title;

              return (
                <div
                  key={item.title}
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.title)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className={`relative px-3 py-2 text-[15px] font-semibold transition-colors duration-150 flex items-center gap-1 cursor-pointer select-none ${
                      isStart || isDropdownOpen
                        ? "text-[#2b3467]"
                        : "text-[#2b3467] hover:text-[#dd0a35]"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.hasDropdown && (
                      <span className="text-[10px] text-slate-500 font-bold ml-0.5 leading-none transition-transform duration-150 group-hover:rotate-180">
                        ▾
                      </span>
                    )}

                    {/* Red bottom indicator line (like on official hkjf.de) */}
                    {(isStart || isDropdownOpen) && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#dd0a35]" />
                    )}
                    {/* Hover indicator for non-active items */}
                    {!isStart && !isDropdownOpen && (
                      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#dd0a35] opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>

                  {/* Dropdown Menu Box */}
                  {item.dropdown && (
                    <div
                      className={`absolute top-full left-0 w-64 bg-white shadow-2xl rounded-b-xl border border-t-0 border-slate-100 py-1 z-50 transition-all duration-150 before:content-[''] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
                        isDropdownOpen
                          ? "opacity-100 visible"
                          : "opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto"
                      }`}
                    >
                      <div className="flex flex-col">
                        {item.dropdown.map((subItem) => (
                          <a
                            key={subItem.title}
                            href={subItem.href}
                            target={subItem.isExternal ? "_blank" : undefined}
                            rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center justify-between px-5 py-3 text-[14px] font-medium text-[#2b3467] hover:bg-[#bed8eb] hover:text-[#2b3467] transition-colors"
                          >
                            <span>{subItem.title}</span>
                            {subItem.isExternal && (
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-[#2b3467] hover:bg-white/80 transition-colors border border-slate-300"
              aria-label="Menü öffnen"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#dd0a35]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white rounded-2xl shadow-xl border border-slate-200 mb-4 p-4 space-y-3 animate-in fade-in-50 duration-200">
            {navigationItems.map((item) => (
              <div key={item.title} className="border-b border-slate-100 pb-2">
                <a
                  href={item.href}
                  onClick={() => !item.dropdown && setIsMobileMenuOpen(false)}
                  className="block text-sm font-bold text-[#2b3467] py-1.5 hover:text-[#dd0a35]"
                >
                  {item.title}
                </a>
                {item.dropdown && (
                  <div className="pl-3 space-y-1 mt-1 border-l-2 border-slate-100">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        target={subItem.isExternal ? "_blank" : undefined}
                        rel={subItem.isExternal ? "noopener noreferrer" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-2 py-1.5 text-xs font-semibold text-[#2b3467] hover:bg-[#bed8eb] rounded"
                      >
                        {subItem.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
