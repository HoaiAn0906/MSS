"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
type AuthenticatedUser = {
  username: string;
};

type AuthenticationInfoVm = {
  isAuthenticated: boolean;
  authenticatedUser: AuthenticatedUser;
};

const AuthencationInfo = () => {
  const router = useRouter();

  const [authenticatedInfoVm, setAuthenticatedInfoVm] =
    useState<AuthenticationInfoVm | null>(null);

  async function getAuthenticationInfo(): Promise<AuthenticationInfoVm> {
    const res = await fetch(`/authentication`);
    return await res.json();
  }

  useEffect(() => {
    getAuthenticationInfo().then((data) => {
      setAuthenticatedInfoVm(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {authenticatedInfoVm?.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-full text-gray-400 text-xs">
              <User size={16} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              My Account :{" " + authenticatedInfoVm.authenticatedUser.username}{" "}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem disabled>
                <Link href="/profile" className=" block h-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Link href="/my-orders" className="d-block h-full">
                  My orders
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                router.push("/logout");
              }}
            >
              <Link href="/logout" className="d-block h-full">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/oauth2/authorization/keycloak"
          className="block h-full text-gray-400 text-xs"
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default AuthencationInfo;
