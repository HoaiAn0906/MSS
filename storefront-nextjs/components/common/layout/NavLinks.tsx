"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, HomeIcon, UsersIcon, TagIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  BRAND_URL,
  CATEGORIES_URL,
  PRODUCT_OPTIONS_URL,
  PRODUCT_ATTRIBUTE_GROUPS_URL,
  PRODUCT_ATTRIBUTE_URL,
  PRODUCT_URL,
  TAX_CLASS_URL,
  TAX_RATE_URL,
} from "@/constants/Common";

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  {
    name: "Catalog",
    href: "",
    icon: UsersIcon,
    children: [
      { name: "Brands", href: BRAND_URL },
      { name: "Categories", href: CATEGORIES_URL },
      { name: "Products", href: PRODUCT_URL },
      { name: "Product Options", href: PRODUCT_OPTIONS_URL },
      { name: "Product Attribute Groups", href: PRODUCT_ATTRIBUTE_GROUPS_URL },
      { name: "Product Attributes", href: PRODUCT_ATTRIBUTE_URL },
    ],
  },
  {
    name: "Tax",
    href: "",
    icon: TagIcon,
    children: [
      { name: "Tax Classes", href: TAX_CLASS_URL },
      { name: "Tax Rates", href: TAX_RATE_URL },
    ],
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);

  const toggleOpen = (name: string) => {
    setOpen(open === name ? null : name);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  /*eslint-disable react-hooks/exhaustive-deps*/
  useEffect(() => {
    links.forEach((link) => {
      if (link.children) {
        link.children.forEach((child) => {
          if (isActive(child.href)) {
            setOpen(link.name);
          }
        });
      } else {
        if (isActive(link.href)) {
          setOpen(link.name);
        }
      }
    });
  }, [pathname]);

  return (
    <div className="space-y-2">
      {links.map((link) => {
        const LinkIcon = link.icon;

        // Check if the link has children
        if (link.children) {
          const isAnyChildActive = link.children.some((child) =>
            isActive(child.href)
          );

          return (
            <div key={link.name}>
              <button
                onClick={() => toggleOpen(link.name)}
                className={cn(
                  "flex items-center justify-between w-full p-2 rounded-lg text-left",
                  isAnyChildActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <div className="flex items-center space-x-2">
                  <LinkIcon className="h-5 w-5" />
                  <span>{link.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    open === link.name ? "rotate-180" : ""
                  )}
                />
              </button>
              {open === link.name && (
                <div className="ml-6 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={cn(
                        "block px-2 py-1 text-sm rounded-md",
                        isActive(child.href)
                          ? "font-medium text-foreground bg-muted"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // Render regular link
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center p-2 rounded-lg",
              pathname === link.href
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <LinkIcon className="mr-2 h-5 w-5" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
