'use client'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";



export default function Navbar(){
  const [active,setActive]=useState("")
  const pathName = usePathname()
    return (
      <div className="w-full font-bold ">
        <div className="flex items-center justify-between max-w-7xl mx-auto ">
          <div>
            <Link href={"/"}>
              <Image src={"/tutor-logo.png"} alt="" height={30} width={30} />
            </Link>
          </div>

          <div className="flex items-center gap-6 p-2 font-medium text-xl">
            <Link
              href={"/"}
              className={pathName === "/" ? "text-orange-400" : ""}
            >
              Home
            </Link>

            <Link
              href={"/companions"}
              className={pathName === "/companions" ? "text-orange-400" : ""}
            >
              Learning Companions
            </Link>

            <Link
              href={"/myjourney"}
              className={pathName === "/myjourney" ? "text-orange-400" : ""}
            >
              My journey
            </Link>

            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-purple-700 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton />
              </Show>
            </header>
          </div>
        </div>
      </div>
    );
}