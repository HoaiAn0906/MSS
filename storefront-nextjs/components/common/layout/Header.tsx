"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, CircleHelp, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { toast } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

const dataMenuTopNoLogin = [
  {
    id: 1,
    name: "Notification",
    links: "#",
    icon: <Bell size={14} />,
  },
  {
    id: 2,
    name: "Help & FAQs",
    links: "#",
    icon: <CircleHelp size={14} />,
  },
  {
    id: 3,
    name: "EN",
    links: "#",
  },
];

const searchSuggestions = [
  {
    name: "iphone 15",
    links: "#",
  },
  {
    name: "iphone 14",
    links: "#",
  },
  {
    name: "iphone 13",
    links: "#",
  },
];

const Header = ({ children }: Props) => {
  const { numberCartItems } = useCartContext();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="border-b border-gradient-to-r from-orange-500 via-red-500 to-pink-500">
        <nav className="bg-gray-900 h-10">
          <div className="flex items-center justify-between min-w-[1000px] h-full mx-auto container">
            <div className="text-xs text-gray-400">
              Free shipping for standard order over $100
            </div>

            <div className="flex items-center h-full">
              {dataMenuTopNoLogin.map((item) => (
                <Link
                  href={item.links}
                  className="flex items-center px-4 text-xs text-gray-400 border-r border-white/30 hover:text-indigo-400"
                  key={item.id}
                >
                  {item.icon && <div className="mr-1">{item.icon}</div>}
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center px-4">{children}</div>
            </div>
          </div>
        </nav>

        <nav className="flex items-center bg-transparent gap-14 min-w-[1000px] mx-auto container">
          <Link href="/" className="min-w-[200px] me-3">
            <h3 className="text-black text-xl">MSS - Storefront</h3>
          </Link>

          <div className="flex-grow">
            <div className="my-2">
              {/* <form className="flex border border-gray-300 rounded-lg h-10 relative">
                <label
                  htmlFor="header-search"
                  className="flex items-center px-2 cursor-pointer"
                >
                  <Search size={14} />
                </label>
                <input
                  id="header-search"
                  className="flex-1"
                  placeholder="What you will find today?"
                />

                <button
                  type="submit"
                  className="px-4 text-blue-600 relative hover:bg-blue-100"
                >
                  Search
                </button>
              </form> */}
              <div className="flex w-full items-center space-x-2">
                <Input placeholder="Search" className="w-full h-11" />
                <Button
                  type="submit"
                  className="h-11"
                  onClick={() => {
                    toast.success("Feature under development");
                  }}
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="my-2 text-sm h-5 overflow-hidden">
              {searchSuggestions.map((item) => (
                <span key={item.name} className="inline-block mx-1 text-xs">
                  {item.name}
                </span>
              ))}
            </div>
          </div>

          <Link
            className="relative p-2.5 rounded-lg text-blue-600 hover:bg-blue-100"
            href="/cart"
          >
            <div className="cursor-pointer">
              <ShoppingCart size={14} />
            </div>
            <div className="absolute top-[-6px] right-[-8px] text-xs text-white bg-red-500 rounded-full h-5 text-center px-1.5">
              {numberCartItems}
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
